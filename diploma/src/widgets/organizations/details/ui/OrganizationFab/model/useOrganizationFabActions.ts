import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { organizationQuery, type Organization } from "@entities/organization";
import type { OrganizationDetailsTab } from "../../../info/config/tabs";
import { useOrganizationDetailsAccess } from "../../../info/model/useAccess";
import {
  organizationFabActionsConfig,
  type OrganizationFabActionConfig,
} from "../config/fabActionsConfig";

interface Params {
  organizationId: string;
  organization: Organization;
  canViewMembersTab?: boolean;
  activeTab?: OrganizationDetailsTab;
  onTabChange?: (nextTab: OrganizationDetailsTab) => void;
}

export interface OrganizationFabAction extends OrganizationFabActionConfig {
  label: string;
  onClick: () => void;
}

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "IF";

export const useOrganizationFabActions = ({
  organizationId,
  organization,
  canViewMembersTab,
  activeTab,
  onTabChange,
}: Params) => {
  const { t } = useTranslation("organizations");
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const handledTaskRequest = useRef<string | null>(null);
  const [fallbackTab, setFallbackTab] =
    useState<OrganizationDetailsTab>("overview");
  const selectedTab = activeTab ?? fallbackTab;
  const selectTab = onTabChange ?? setFallbackTab;
  const access = useOrganizationDetailsAccess({
    organization,
    canViewMembersTab: canViewMembersTab ?? false,
    activeTab: selectedTab,
    onTabChange: selectTab,
  });
  const editAccessQuery = useQuery({
    ...organizationQuery.editAccess(organizationId),
    enabled: Boolean(organizationId) && !access.isOrganizationOwner,
    retry: false,
  });
  const rolesAccessQuery = useQuery({
    ...organizationQuery.contextRoles(organizationId),
    enabled: Boolean(organizationId),
    retry: false,
    select: () => true,
  });
  const canManage = access.isOrganizationOwner || Boolean(editAccessQuery.data);
  const canManageRoles =
    access.isOrganizationOwner || Boolean(rolesAccessQuery.data);
  const isAccessLoading =
    access.isSubscriptionResolutionPending ||
    (!access.isOrganizationOwner && editAccessQuery.isLoading);
  const closeMenu = () => setIsOpen(false);
  const createTaskRequested = Boolean(
    (location.search as { createTask?: boolean | string }).createTask,
  );
  const taskRequestKey = `${organizationId}:${location.href}`;

  useEffect(() => {
    if (createTaskRequested && handledTaskRequest.current !== taskRequestKey) {
      handledTaskRequest.current = taskRequestKey;
      setIsTaskDrawerOpen(true);
    }
  }, [createTaskRequested, taskRequestKey]);

  const actions = useMemo<OrganizationFabAction[]>(
    () =>
      organizationFabActionsConfig
        .filter(
          (action) =>
            action.permission === "visible" ||
            (action.permission === "manage" && canManage) ||
            (action.permission === "roles" && canManageRoles),
        )
        .map((action) => ({
          ...action,
          label: t(action.labelKey),
          onClick: () => {
            closeMenu();
            if (action.id === "new-task") {
              setIsTaskDrawerOpen(true);
              return;
            }
            if (action.id === "dashboard") selectTab("overview");
            if (action.target) {
              void navigate({
                to: action.target,
                params: { id: organizationId },
              });
            }
          },
        }))
        .reverse(),
    [canManage, canManageRoles, navigate, organizationId, selectTab, t],
  );
  const normalizedPath = location.pathname.replace(/\/+$/, "");

  return {
    actions,
    isOpen,
    setIsOpen,
    closeMenu,
    isTaskDrawerOpen,
    closeTaskDrawer: () => setIsTaskDrawerOpen(false),
    initials: getInitials(organization.name),
    shouldShowContextBlock:
      normalizedPath !== `/organizations/${organizationId}`,
    isVisible: !isAccessLoading && (canManage || canManageRoles),
    openDashboard: actions.find((action) => action.id === "dashboard")?.onClick,
  };
};

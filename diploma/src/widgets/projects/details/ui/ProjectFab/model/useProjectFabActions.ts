import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { Project, ProjectMode } from "@entities/project";
import { pendingEntityRequestsQuery } from "@entities/request";
import { getContextRolesForEntity } from "@entities/organization";
import { useProjectPermissionContext } from "../../../model/useProjectPermissionContext";
import {
  canManageProject,
  canManageProjectMembers,
  canManageProjectRoles,
} from "../../../lib/projectPermissions";
import {
  projectFabActionsConfig,
  type ProjectFabActionConfig,
} from "../config/fabActionsConfig";
import { useTranslation } from "react-i18next";

interface Params {
  projectId: string;
  project: Project;
  activeTab?: ProjectMode;
  onTabChange?: (nextTab: "overview") => void;
}

export interface ProjectFabAction extends ProjectFabActionConfig {
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

export const useProjectFabActions = ({
  projectId,
  project,
  onTabChange,
}: Params) => {
  const { t } = useTranslation(["project"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const permissionContext = useProjectPermissionContext(project);
  const rolesAccessResult = useQuery({
    queryKey: ["context-roles", "project", projectId],
    queryFn: () => getContextRolesForEntity("project", projectId),
    enabled: !canManageProjectRoles(project, permissionContext),
    retry: false,
  });
  const currentRole = rolesAccessResult.data?.find(
    (role) => role.id === project.currentUserRole?.roleId,
  );
  const projectWithResolvedRole = currentRole
    ? {
        ...project,
        currentUserRole: {
          ...project.currentUserRole,
          permissions: currentRole.permissions,
        },
      }
    : project;
  const hasKnownMembersAccess = canManageProjectMembers(
    projectWithResolvedRole,
    permissionContext,
  );
  const membersAccessResult = useQuery({
    ...pendingEntityRequestsQuery("project", projectId, "join"),
    enabled: !hasKnownMembersAccess,
  });
  const canContent = canManageProject(
    projectWithResolvedRole,
    permissionContext,
  );
  const canMembers =
    hasKnownMembersAccess || membersAccessResult.isSuccess;
  const canRoles =
    canManageProjectRoles(projectWithResolvedRole, permissionContext) ||
    rolesAccessResult.isSuccess;
  const closeMenu = () => setIsOpen(false);

  const actions = useMemo<ProjectFabAction[]>(
    () =>
      projectFabActionsConfig
        .filter(
          (action) =>
            action.permission === "visible" ||
            (action.permission === "content" && canContent) ||
            (action.permission === "members" && canMembers) ||
            (action.permission === "roles" && canRoles),
        )
        .map((action) => ({
          ...action,
          label: t(action.labelKey),
          onClick: () => {
            closeMenu();
            if (action.id === "dashboard") {
              onTabChange?.("overview");
              return;
            }
            if (action.id === "new-task") {
              setIsTaskDrawerOpen(true);
              return;
            }
            if (action.id === "new-event" && project.organizationId) {
              void navigate({
                to: action.target!,
                params: { id: project.organizationId },
                search: { projectId },
              });
              return;
            }
            if (action.target) {
              void navigate({
                to: action.target,
                params: { id: projectId },
              });
            }
          },
        }))
        .reverse(),
    [
      canContent,
      canMembers,
      canRoles,
      navigate,
      onTabChange,
      project.organizationId,
      projectId,
      t,
    ],
  );
  const normalizedPath = location.pathname.replace(/\/+$/, "");

  return {
    actions,
    isOpen,
    setIsOpen,
    closeMenu,
    isTaskDrawerOpen,
    closeTaskDrawer: () => setIsTaskDrawerOpen(false),
    initials: getInitials(project.title),
    shouldShowContextBlock: normalizedPath !== `/projects/${projectId}`,
    isVisible: canContent || canMembers || canRoles,
    openDashboard: actions.find((action) => action.id === "dashboard")?.onClick,
  };
};

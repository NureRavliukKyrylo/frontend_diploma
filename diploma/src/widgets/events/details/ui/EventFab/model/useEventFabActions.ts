import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { Event, EventJoinedMode, EventMode } from "@entities/event";
import { contextRoleQuery } from "@entities/organization";
import { pendingEntityRequestsQuery } from "@entities/request";
import {
  canManageEvent,
  canManageEventMembers,
  canManageEventRoles,
  canViewEventAttendance,
} from "../../../lib/eventPermissions";
import { useEventPermissionContext } from "../../../model/useEventPermissionContext";
import {
  eventFabActionsConfig,
  type EventFabActionConfig,
} from "../config/fabActionsConfig";
import { useTranslation } from "react-i18next";

interface Params {
  eventId: string;
  event: Event;
  activeTab?: EventMode | EventJoinedMode;
  onTabChange?: (nextTab: "overview") => void;
}

export interface EventFabAction extends EventFabActionConfig {
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

export const useEventFabActions = ({
  eventId,
  event,
  onTabChange,
}: Params) => {
  const { t } = useTranslation(["event"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const permissionContext = useEventPermissionContext(event);
  const rolesAccessResult = useQuery({
    ...contextRoleQuery.entity("event", eventId),
    enabled: !canManageEventRoles(event, permissionContext),
    retry: false,
  });
  const currentRole = rolesAccessResult.data?.find(
    (role) => role.id === event.currentUserRole?.roleId,
  );
  const eventWithResolvedRole = currentRole
    ? {
        ...event,
        currentUserRole: {
          ...event.currentUserRole,
          permissions: currentRole.permissions,
        },
      }
    : event;
  const hasKnownMembersAccess = canManageEventMembers(
    eventWithResolvedRole,
    permissionContext,
  );
  const membersAccessResult = useQuery({
    ...pendingEntityRequestsQuery("event", eventId, "join"),
    enabled: !hasKnownMembersAccess,
  });
  const canContent = canManageEvent(
    eventWithResolvedRole,
    permissionContext,
  );
  const canMembers =
    hasKnownMembersAccess || membersAccessResult.isSuccess;
  const canRoles =
    canManageEventRoles(eventWithResolvedRole, permissionContext) ||
    rolesAccessResult.isSuccess;
  const canAttendance = canViewEventAttendance(
    eventWithResolvedRole,
    permissionContext,
  );
  const closeMenu = () => setIsOpen(false);

  const actions = useMemo<EventFabAction[]>(
    () =>
      eventFabActionsConfig
        .filter(
          (action) =>
            action.permission === "visible" ||
            (action.permission === "content" && canContent) ||
            (action.permission === "members" && canMembers) ||
            (action.permission === "roles" && canRoles) ||
            (action.permission === "attendance" && canAttendance),
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
            if (action.target) {
              void navigate({
                to: action.target,
                params: { id: eventId },
              });
            }
          },
        }))
        .reverse(),
    [
      canAttendance,
      canContent,
      canMembers,
      canRoles,
      eventId,
      navigate,
      onTabChange,
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
    initials: getInitials(event.title),
    shouldShowContextBlock: normalizedPath !== `/events/${eventId}`,
    isVisible: canContent || canMembers || canRoles || canAttendance,
    openDashboard: actions.find((action) => action.id === "dashboard")?.onClick,
  };
};

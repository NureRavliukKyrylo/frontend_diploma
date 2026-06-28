import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { Event, EventMode } from "@entities/event";
import {
  canManageEvent,
  canManageEventMembers,
  canManageEventRoles,
  canViewEventAttendance,
} from "../../../lib/eventPermissions";
import {
  eventFabActionsConfig,
  type EventFabActionConfig,
} from "../config/fabActionsConfig";
import { useTranslation } from "react-i18next";

interface Params {
  eventId: string;
  event: Event;
  activeTab?: EventMode;
  onTabChange?: (nextTab: EventMode) => void;
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
  const canContent = canManageEvent(event);
  const canMembers = canManageEventMembers(event);
  const canRoles = canManageEventRoles(event);
  const canAttendance = canViewEventAttendance(event);
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

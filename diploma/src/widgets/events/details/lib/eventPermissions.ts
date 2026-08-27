import type { Event } from "@entities/event";

export interface EventPermissionContext {
  isOrganizationOwner?: boolean;
  systemRole?: string | null;
  isLoading?: boolean;
}

const hasEventPermission = (
  event: Event | undefined,
  permission: string,
  context: EventPermissionContext = {},
) => {
  const systemRole = context.systemRole?.trim().toLowerCase();
  const hasBypass =
    context.isOrganizationOwner === true ||
    systemRole === "admin" ||
    systemRole === "superadmin";

  if (hasBypass) return true;

  const permissions = event?.currentUserRole?.permissions;
  if (!permissions) return false;
  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageEvent = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "event.content_manage", context);

export const canManageEventMembers = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "event.members_manage", context);

export const canManageEventRoles = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "event.roles_manage", context);

export const canViewEventAttendance = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "attendance.view_event", context);

export const canApproveEventAttendance = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "attendance.approve_event", context);

export const canRejectEventAttendance = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "attendance.reject_event", context);

export const canResolveEventAttendance = (
  event: Event | undefined,
  context?: EventPermissionContext,
) => hasEventPermission(event, "attendance.resolve_dispute", context);

import type { Event } from "@entities/event";

const hasEventPermission = (event: Event | undefined, permission: string) => {
  const permissions = event?.currentUserRole?.permissions;
  if (!permissions) return true;
  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageEvent = (event: Event | undefined) =>
  hasEventPermission(event, "event.content_manage");

export const canManageEventMembers = (event: Event | undefined) =>
  hasEventPermission(event, "event.members_manage");

export const canManageEventRoles = (event: Event | undefined) =>
  hasEventPermission(event, "event.roles_manage");

export const canViewEventAttendance = (event: Event | undefined) =>
  hasEventPermission(event, "attendance.view_event");

export const canApproveEventAttendance = (event: Event | undefined) =>
  hasEventPermission(event, "attendance.approve_event");

export const canRejectEventAttendance = (event: Event | undefined) =>
  hasEventPermission(event, "attendance.reject_event");

export const canResolveEventAttendance = (event: Event | undefined) =>
  hasEventPermission(event, "attendance.resolve_dispute");

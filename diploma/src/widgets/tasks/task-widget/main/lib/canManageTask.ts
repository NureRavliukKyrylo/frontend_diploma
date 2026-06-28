import type { Task } from "@entities/task";

const hasTaskPermission = (task: Task | undefined, permission: string) => {
  const permissions = task?.currentUserRole?.permissions;

  if (!permissions) return true;

  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageTask = (task: Task | undefined) =>
  hasTaskPermission(task, "task.content_manage");

export const canManageTaskMembers = (task: Task | undefined) =>
  hasTaskPermission(task, "task.members_manage");

export const canManageTaskRoles = (task: Task | undefined) =>
  hasTaskPermission(task, "task.roles_manage");

export const canViewTaskTimeLogs = (task: Task | undefined) =>
  Boolean(task?.timeLoggingEnabled) &&
  hasTaskPermission(task, "task.timelog_view_all");

export const canManagerEditTaskTimeLogs = (task: Task | undefined) =>
  hasTaskPermission(task, "task.timelog_edit_manager");

export const canApproveTaskTimeLogs = (task: Task | undefined) =>
  hasTaskPermission(task, "task.timelog_approve");

export const canRejectTaskTimeLogs = (task: Task | undefined) =>
  hasTaskPermission(task, "task.timelog_reject");

export const canResolveTaskTimeLogs = (task: Task | undefined) =>
  hasTaskPermission(task, "task.timelog_resolve_dispute");

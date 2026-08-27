import type { Task } from "@entities/task";

export interface TaskPermissionContext {
  isOrganizationOwner?: boolean;
  systemRole?: string | null;
  isLoading?: boolean;
}

const hasTaskPermission = (
  task: Task | undefined,
  permission: string,
  context: TaskPermissionContext = {},
) => {
  const systemRole = context.systemRole?.trim().toLowerCase();
  const hasBypass =
    context.isOrganizationOwner === true ||
    systemRole === "admin" ||
    systemRole === "superadmin";

  if (hasBypass) return true;

  const permissions = task?.currentUserRole?.permissions;

  if (!permissions) return false;

  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageTask = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.content_manage", context);

export const canManageTaskMembers = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.members_manage", context);

export const canManageTaskRoles = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.roles_manage", context);

export const canViewTaskTimeLogs = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) =>
  Boolean(task?.timeLoggingEnabled) &&
  hasTaskPermission(task, "task.timelog_view_all", context);

export const canManagerEditTaskTimeLogs = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.timelog_edit_manager", context);

export const canApproveTaskTimeLogs = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.timelog_approve", context);

export const canRejectTaskTimeLogs = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.timelog_reject", context);

export const canResolveTaskTimeLogs = (
  task: Task | undefined,
  context?: TaskPermissionContext,
) => hasTaskPermission(task, "task.timelog_resolve_dispute", context);

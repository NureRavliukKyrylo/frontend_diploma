import type { Task } from "@entities/task";

export const canManageTask = (task: Task | undefined) => {
  const permissions = task?.currentUserRole?.permissions;

  if (!permissions) return true;

  return (
    permissions.includes("*") || permissions.includes("task.content_manage")
  );
};

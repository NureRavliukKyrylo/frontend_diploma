import type { Task } from "@entities/task";

const taskContentManagePermission = "task.content_manage";

export const hasTaskContentManagePermission = (task: Task | undefined) => {
  const permissions = task?.currentUserRole?.permissions;
  if (!permissions) return true;

  return (
    permissions.includes("*") ||
    permissions.includes(taskContentManagePermission)
  );
};

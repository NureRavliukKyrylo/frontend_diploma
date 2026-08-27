import type { Task } from "@entities/task";
import {
  canManageTask,
  canManageTaskMembers,
  canViewTaskTimeLogs,
} from "@widgets/tasks/task-widget/main/lib/canManageTask";

const createTask = (
  permissions?: string[],
  timeLoggingEnabled = true,
) =>
  ({
    currentUserRole: permissions
      ? {
          roleId: "role-1",
          name: "Manager",
          permissions,
        }
      : null,
    timeLoggingEnabled,
  }) as Task;

describe("task management permissions", () => {
  it("fails closed when role permissions are unavailable", () => {
    const task = createTask();

    expect(canManageTask(task)).toBe(false);
    expect(canManageTaskMembers(task)).toBe(false);
    expect(canViewTaskTimeLogs(task)).toBe(false);
  });

  it("allows direct permissions and wildcard roles", () => {
    expect(
      canManageTask(createTask(["task.content_manage"])),
    ).toBe(true);
    expect(canManageTaskMembers(createTask(["*"]))).toBe(true);
  });

  it("allows organization owners and system administrators", () => {
    const task = createTask();

    expect(
      canManageTask(task, { isOrganizationOwner: true }),
    ).toBe(true);
    expect(canManageTaskMembers(task, { systemRole: "Admin" })).toBe(true);
    expect(
      canViewTaskTimeLogs(task, { systemRole: "SuperAdmin" }),
    ).toBe(true);
  });

  it("keeps time logs hidden when time tracking is disabled", () => {
    const task = createTask(undefined, false);

    expect(
      canViewTaskTimeLogs(task, { isOrganizationOwner: true }),
    ).toBe(false);
  });
});

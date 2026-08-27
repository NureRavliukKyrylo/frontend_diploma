import type { Project } from "@entities/project";

export interface ProjectPermissionContext {
  isOrganizationOwner?: boolean;
  systemRole?: string | null;
  isLoading?: boolean;
}

const hasProjectPermission = (
  project: Project | undefined,
  permission: string,
  context: ProjectPermissionContext = {},
) => {
  const systemRole = context.systemRole?.trim().toLowerCase();
  const hasBypass =
    context.isOrganizationOwner === true ||
    systemRole === "admin" ||
    systemRole === "superadmin";

  if (hasBypass) return true;

  const permissions = project?.currentUserRole?.permissions;
  if (!permissions) return false;

  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageProject = (
  project: Project | undefined,
  context?: ProjectPermissionContext,
) => hasProjectPermission(project, "project.content_manage", context);

export const canManageProjectMembers = (
  project: Project | undefined,
  context?: ProjectPermissionContext,
) => hasProjectPermission(project, "project.members_manage", context);

export const canManageProjectRoles = (
  project: Project | undefined,
  context?: ProjectPermissionContext,
) => hasProjectPermission(project, "project.roles_manage", context);

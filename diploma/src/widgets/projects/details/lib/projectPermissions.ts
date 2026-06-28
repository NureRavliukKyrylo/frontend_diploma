import type { Project } from "@entities/project";

const hasProjectPermission = (
  project: Project | undefined,
  permission: string,
) => {
  const permissions = project?.currentUserRole?.permissions;
  if (!permissions) return true;
  return permissions.includes("*") || permissions.includes(permission);
};

export const canManageProject = (project: Project | undefined) =>
  hasProjectPermission(project, "project.content_manage");

export const canManageProjectMembers = (project: Project | undefined) =>
  hasProjectPermission(project, "project.members_manage");

export const canManageProjectRoles = (project: Project | undefined) =>
  hasProjectPermission(project, "project.roles_manage");

import type { Project } from "@entities/project";
import type { EntityStatus } from "@shared/config/types";

const projectContentManagePermission = "project.content_manage";

export const getProjectSettingsErrorMessage = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const data = error.response.data as {
      message?: string;
      title?: string;
      errors?: Record<string, string[]>;
    };

    if (data.message) return data.message;
    if (data.title) return data.title;

    const firstError = data.errors
      ? Object.values(data.errors).flat().find(Boolean)
      : null;

    if (firstError) return firstError;
  }

  return "Something went wrong.";
};

export const getProjectStatus = (project: Project): EntityStatus => {
  if (project.isArchived) return "archived";
  return project.status ?? project.volunteerProjectState ?? "active";
};

export const hasProjectContentManagePermission = (project: Project | undefined) => {
  const permissions = project?.currentUserRole?.permissions;
  if (!permissions) return true;

  return (
    permissions.includes("*") ||
    permissions.includes(projectContentManagePermission)
  );
};

import type { Project } from "@entities/project";
import type { ProjectSettingsValues } from "../model/types";
import { toProjectDateInputValue } from "./date";
import { normalizeProjectPolicy } from "./projectSettingsPolicy";

export const getProjectLocationLabel = (project: Project) => {
  const locationInfo = project.locationInfo;
  const locationText =
    locationInfo?.address ??
    [locationInfo?.region, locationInfo?.city, locationInfo?.country]
      .filter(Boolean)
      .join(", ");

  if (locationText) return locationText;

  if (project.location) {
    return `${project.location.latitude.toFixed(
      4,
    )}, ${project.location.longitude.toFixed(4)}`;
  }

  return "";
};

export const getProjectCategoryIds = (project: Project) => {
  if (project.categoryIds?.length) return project.categoryIds;
  return project.categories?.map((category) => category.id) ?? [];
};

export const getProjectSettingsDefaults = (
  project: Project,
): ProjectSettingsValues => ({
  title: project.title ?? "",
  description: project.description ?? "",
  startAt: toProjectDateInputValue(project.startAt),
  endAt: toProjectDateInputValue(project.endAt),
  location: project.location
    ? {
        latitude: project.location.latitude,
        longitude: project.location.longitude,
        regionLabel: getProjectLocationLabel(project),
      }
    : null,
  locationLabel: getProjectLocationLabel(project),
  categoryIds: getProjectCategoryIds(project),
  joinPolicy: normalizeProjectPolicy(project.joinPolicy, "open"),
  leavePolicy: normalizeProjectPolicy(project.leavePolicy, "approval_required"),
});

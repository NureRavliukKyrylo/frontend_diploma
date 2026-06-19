import type {
  OrganizationCategoryStats,
  OrganizationSocialLink,
} from "../model/types";
import { pickString } from "./normalizeOrganizationValues";

export const normalizeCategoryStats = (
  raw: unknown,
): OrganizationCategoryStats | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  const categoryId = pickString(
    value.categoryId as string | undefined,
    value.CategoryId as string | undefined,
  );
  const name = pickString(
    value.name as string | undefined,
    value.Name as string | undefined,
  );

  if (!categoryId || !name) return null;

  const tasksTotal = Number(
    value.tasksTotal ?? value.TasksTotal ?? value.totalTasks ?? 0,
  );
  const tasksActive = Number(
    value.tasksActive ?? value.TasksActive ?? value.activeTasks ?? 0,
  );

  return {
    categoryId,
    name,
    imageUrl:
      (value.imageUrl as string | null | undefined) ??
      (value.ImageUrl as string | null | undefined) ??
      null,
    tasksTotal: Number.isFinite(tasksTotal) ? tasksTotal : 0,
    tasksActive: Number.isFinite(tasksActive) ? tasksActive : 0,
  };
};

export const normalizeSocialLink = (
  raw: unknown,
): OrganizationSocialLink | null => {
  if (typeof raw !== "object" || raw === null) return null;

  const value = raw as Record<string, unknown>;
  const url = pickString(
    value.url as string | undefined,
    value.Url as string | undefined,
  );

  if (!url) return null;

  return {
    url,
    platform: pickString(
      value.platform as string | undefined,
      value.Platform as string | undefined,
    ),
    title: pickString(
      value.title as string | undefined,
      value.Title as string | undefined,
    ),
  };
};

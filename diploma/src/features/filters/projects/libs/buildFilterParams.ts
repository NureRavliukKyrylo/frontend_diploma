import type { ProjectFiltersCategory } from "@entities/project/model/types/ProjectFiltersCategory";

export const buildFilterParams = (
  filters: ProjectFiltersCategory,
): Record<string, string | string[]> => {
  const params: Record<string, string | string[]> = {};

  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.dueDate) params.dueDate = filters.dueDate;
  if (filters.rating !== undefined && filters.rating > 0) {
    params.rating = filters.rating.toString();
  }
  if (filters.categories.length > 0) {
    params["categories[]"] = filters.categories;
  }
  if (filters.organizations.length > 0) {
    params["organizations[]"] = filters.organizations;
  }
  if (filters.distance !== undefined) {
    params.distance = filters.distance.toString();
  }
  if (filters.search) params.search = filters.search;
  if (filters.page) params.page = filters.page.toString();

  return params;
};

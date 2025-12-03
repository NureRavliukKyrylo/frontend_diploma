import { apiClient } from "@shared/api";
import type { ProjectFiltersCategory } from "../model/types/ProjectFiltersCategory";

export interface Project {
  id: string;
  title: string;
  description: string;
  rating: number;
  category: string;
  organization: string;
  deadline: string;
  distance?: number;
}

export interface ProjectsResponse {
  data: Project[];
  total: number;
  page: number;
  limit: number;
}

export const projectsApi = {
  getFilteredProjects: async (
    categoryName: string,
    filters: ProjectFiltersCategory
  ): Promise<ProjectsResponse> => {
    const params = new URLSearchParams();

    if (filters.startDate) {
      params.append("startDate", filters.startDate);
    }

    if (filters.dueDate) {
      params.append("dueDate", filters.dueDate);
    }

    if (filters.rating !== undefined && filters.rating > 0) {
      params.append("rating", filters.rating.toString());
    }

    if (filters.categories.length > 0) {
      filters.categories.forEach((cat) => params.append("categories[]", cat));
    }

    if (filters.organizations.length > 0) {
      filters.organizations.forEach((org) =>
        params.append("organizations[]", org)
      );
    }

    if (filters.distance !== undefined) {
      params.append("distance", filters.distance.toString());
    }

    const response = await apiClient.get<ProjectsResponse>(
      `/categories/${categoryName}/projects`,
      { params }
    );

    return response.data;
  },
};

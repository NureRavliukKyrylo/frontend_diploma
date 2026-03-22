import { apiClient } from "@shared/api";
import type { Project, ProjectAppliedFilters } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { MyProjectSearchParams } from "../../libs";

export interface MyProjectsResponse {
  data: Project[];
  pagination: PaginationResponse;
  appliedFilters: ProjectAppliedFilters;
}

export const getMyProjects = async (
  params?: MyProjectSearchParams,
): Promise<MyProjectsResponse> => {
  const response = await apiClient.get("/Projects/my/volunteer/list", {
    params,
  });
  return response.data;
};

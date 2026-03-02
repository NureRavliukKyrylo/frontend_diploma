import { apiClient } from "@shared/api";
import type { Project } from "../model/types/Project";
import { type ProjectSearchParams } from "../libs/projectsSearchSchema";
import type { PaginationResponse } from "@shared/config/types";

export interface ProjectsResponse {
  data: Project[];
  pagination: PaginationResponse;
}

export type ProjectQueryParams = ProjectSearchParams & {
  pageSize?: number;
};

export const getListProjects = async (
  params?: ProjectQueryParams,
): Promise<ProjectsResponse> => {
  const response = await apiClient.get("/Projects/list", { params });
  return response.data;
};

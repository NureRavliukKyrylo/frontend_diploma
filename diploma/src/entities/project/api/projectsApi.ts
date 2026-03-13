import { apiClient } from "@shared/api";
import type { Project } from "../model/types/Project";
import { type ProjectBaseParams } from "../libs/projectsSearchSchema";
import type { PaginationResponse } from "@shared/config/types";

export interface ProjectsResponse {
  data: Project[];
  pagination: PaginationResponse;
}

export const getListProjects = async (
  params?: ProjectBaseParams,
): Promise<ProjectsResponse> => {
  const response = await apiClient.get("/Projects/list", { params });
  return response.data;
};

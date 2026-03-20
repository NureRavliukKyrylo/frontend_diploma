import { apiClient } from "@shared/api";
import type { Project } from "../model/types/Project";
import type { PaginationResponse } from "@shared/config/types";
import type { MyProjectSearchParams } from "../libs";

export interface MyProjectsResponse {
  data: Project[];
  pagination: PaginationResponse;
}

export const getMyProjects = async (
  params?: MyProjectSearchParams,
): Promise<MyProjectsResponse> => {
  const response = await apiClient.get("/Projects/my/list", { params });
  return response.data;
};

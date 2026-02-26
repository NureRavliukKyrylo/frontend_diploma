import { apiClient } from "@shared/api";
import type { Project } from "../model/types/Project";
import { z } from "zod";
import { projectSearchSchema } from "../libs/projectsSearchSchema";

export interface ProjectsResponse {
  data: Project[];
  pagination: {
    totalCount: number;
    page: number;
    pageSize: number;
  };
}

export type ProjectSearchParams = z.infer<typeof projectSearchSchema>;

export const getListProjects = async (
  params?: ProjectSearchParams,
): Promise<ProjectsResponse> => {
  const response = await apiClient.get("/Projects/list", { params });
  return response.data;
};

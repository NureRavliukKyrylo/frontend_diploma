import type { Project } from "@entities/project/model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getProjectId = async (
  id: string,
): Promise<ApiResponse<Project>> => {
  const result = await apiClient.get(`/Projects/${id}`);
  return result.data;
};

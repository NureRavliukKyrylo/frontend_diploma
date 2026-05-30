import type { ProjectJoined } from "@entities/project/model/types";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getProjectJoinedId = async (
  id: string,
): Promise<ApiResponse<ProjectJoined>> => {
  const result = await apiClient.get(`/Projects/joined/${id}`);
  return result.data;
};

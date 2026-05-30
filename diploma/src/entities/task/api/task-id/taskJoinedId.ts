import type { TaskJoined } from "../../model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getTaskJoinedId = async (
  id: string,
): Promise<ApiResponse<TaskJoined>> => {
  const result = await apiClient.get(`/Tasks/joined/${id}`);
  return result.data;
};

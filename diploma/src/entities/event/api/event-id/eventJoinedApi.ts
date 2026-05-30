import type { EventJoined } from "../../model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getEventJoinedId = async (
  id: string,
): Promise<ApiResponse<EventJoined>> => {
  const result = await apiClient.get(`/Events/joined/${id}`);
  return result.data;
};

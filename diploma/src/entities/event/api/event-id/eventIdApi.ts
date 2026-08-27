import type { Event } from "../../model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getEventId = async (id: string): Promise<ApiResponse<Event>> => {
  const result = await apiClient.get(`/Events/${id}`);
  return result.data;
};

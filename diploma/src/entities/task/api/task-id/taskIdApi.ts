import type { Task } from "../../model";
import { apiClient } from "@shared/api";
import { type ApiResponse } from "@shared/api";

export const getTaskId = async (id: string): Promise<ApiResponse<Task>> => {
  const result = await apiClient.get(`/Tasks/${id}`);
  return result.data;
};

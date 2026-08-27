import type { Task } from "../../model";
import { apiClient, type ApiResponse } from "@shared/api";

export interface UpdateTaskStatusPayload {
  status: string;
  comment?: string;
  boardOrder?: number;
}

export const updateTaskStatus = async (
  taskId: string,
  payload: UpdateTaskStatusPayload,
): Promise<ApiResponse<Task>> => {
  const response = await apiClient.put<ApiResponse<Task>>(
    `/Tasks/${taskId}/status`,
    payload,
  );

  return response.data;
};

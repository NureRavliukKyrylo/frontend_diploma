import type { TaskComment } from "../../model";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface TaskCommentsResponse {
  data: TaskComment[];
  pagination: PaginationResponse;
}

export const getTaskComments = async (
  taskId: string,
  params: {
    PageSize: number;
    Page: number;
  },
): Promise<TaskCommentsResponse> => {
  const response = await apiClient.get(`/Tasks/${taskId}/comments`, { params });
  return response.data;
};

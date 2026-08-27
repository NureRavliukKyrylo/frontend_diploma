import { apiClient } from "@shared/api";

export interface DeleteTaskResponse {
  message?: string;
}

export const deleteTask = async (
  taskId: string,
): Promise<DeleteTaskResponse> => {
  const response = await apiClient.delete<DeleteTaskResponse>(
    `/Tasks/delete/${taskId}`,
  );

  return response.data;
};

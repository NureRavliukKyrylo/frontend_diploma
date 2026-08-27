import type { Task } from "../../model";
import type { TasksRequestParams } from "../../libs";
import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";

export interface TaskResponse {
  data: Task[];
  pagination: PaginationResponse;
}

export const getListTasks = async (
  params?: TasksRequestParams,
): Promise<TaskResponse> => {
  const response = await apiClient.get("/Tasks/list", { params });
  return response.data;
};

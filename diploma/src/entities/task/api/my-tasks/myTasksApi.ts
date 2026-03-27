import { apiClient } from "@shared/api";
import type { Task } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { TaskSearchParams } from "../../libs";

export interface MyTasksResponse {
  data: Task[];
  pagination: PaginationResponse;
}

export const getMyTasks = async (
  params?: TaskSearchParams,
): Promise<MyTasksResponse> => {
  const response = await apiClient.get("/Tasks/my/volunteer/list", {
    params,
  });
  return response.data;
};

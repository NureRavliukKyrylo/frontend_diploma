import { apiClient } from "@shared/api";
import type { Task, TaskAppliedFilters } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { MyTasksRequestParams } from "../../libs";

export interface MyTasksResponse {
  data: Task[];
  pagination: PaginationResponse;
  appliedFilters: TaskAppliedFilters;
}

export const getMyTasks = async (
  params?: MyTasksRequestParams,
): Promise<MyTasksResponse> => {
  const response = await apiClient.get("/Tasks/my/volunteer/list", {
    params,
  });
  return response.data;
};

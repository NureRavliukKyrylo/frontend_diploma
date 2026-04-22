import type { MyTasksRequestParams } from "../../libs";
import { getListTasks, getMyTasks, getTaskId } from "../../api";
import { queryOptions } from "@tanstack/react-query";
import type { TasksRequestParams } from "@entities/task/libs/search-schema/tasksSearchSchema";

export const taskKeys = {
  all: () => ["tasks"] as const,
  list: (params: TasksRequestParams) =>
    [...taskKeys.all(), "list", params] as const,
  id: (id: string) => [...taskKeys.all(), "id", id] as const,
  mys: () => [...taskKeys.all(), "my"] as const,
  my: (params: MyTasksRequestParams) => [...taskKeys.mys(), params] as const,
};

export const taskQuery = {
  list: (params: TasksRequestParams) =>
    queryOptions({
      queryKey: taskKeys.list({ ...params }),
      queryFn: () => getListTasks({ ...params }),
      placeholderData: (prev) => prev,
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: taskKeys.id(id),
      queryFn: () => getTaskId(id),
      select: (res) => res.data,
    }),
  my: (params: MyTasksRequestParams) =>
    queryOptions({
      queryKey: taskKeys.my({ ...params }),
      queryFn: () => getMyTasks({ ...params }),
      placeholderData: (prev) => prev,
    }),
};

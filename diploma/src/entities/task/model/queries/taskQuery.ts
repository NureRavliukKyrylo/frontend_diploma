import type { TaskSearchParams } from "../../libs";
import { getListTasks, getMyTasks, getTaskId } from "../../api";
import { queryOptions } from "@tanstack/react-query";

export const taskKeys = {
  all: () => ["tasks"] as const,
  list: (params: TaskSearchParams) =>
    [...taskKeys.all(), "list", params] as const,
  id: (id: string) => [...taskKeys.all(), "id", id] as const,
  mys: () => [...taskKeys.all(), "my"] as const,
  my: (params: TaskSearchParams) => [...taskKeys.mys(), params] as const,
};

export const taskQuery = {
  list: (params: TaskSearchParams) =>
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
  my: (params: TaskSearchParams) =>
    queryOptions({
      queryKey: taskKeys.my({ ...params }),
      queryFn: () => getMyTasks({ ...params }),
      placeholderData: (prev) => prev,
    }),
};

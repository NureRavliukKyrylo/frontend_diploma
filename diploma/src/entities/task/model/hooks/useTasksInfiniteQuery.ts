import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { TasksRequestParams } from "../../libs";
import type { QueryResult } from "@shared/config/types";
import type { Task } from "../types/Task";
import { taskQuery } from "../queries/taskQuery";

export const useTasksInfiniteQuery =
  (params: TasksRequestParams) => (): QueryResult<Task> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useSuspenseInfiniteQuery(taskQuery.listInfinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };

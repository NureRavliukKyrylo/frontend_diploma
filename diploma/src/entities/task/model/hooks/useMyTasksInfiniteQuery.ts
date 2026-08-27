import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { MyTasksRequestParams } from "../../libs";
import type { QueryResult } from "@shared/config/types";
import type { Task } from "../types/Task";
import { taskQuery } from "../queries/taskQuery";

export const useMyTasksInfiniteQuery =
  (params: MyTasksRequestParams) => (): QueryResult<Task> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useSuspenseInfiniteQuery(taskQuery.infiniteMy(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };

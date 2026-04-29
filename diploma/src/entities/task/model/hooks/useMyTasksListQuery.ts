import { useSuspenseQuery } from "@tanstack/react-query";
import type { QueryResult } from "@shared/config/types";
import type { MyTasksRequestParams } from "@entities/task/libs";
import type { Task } from "../types/Task";
import { taskQuery } from "../queries/taskQuery";

export const useMyTasksListQuery =
  (search: MyTasksRequestParams) => (): QueryResult<Task> => {
    const { data } = useSuspenseQuery(taskQuery.my(search));
    return { data: data.data };
  };

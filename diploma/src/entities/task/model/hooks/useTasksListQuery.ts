import type { TasksRequestParams } from "../../libs";
import { taskQuery } from "../queries/taskQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Task } from "../types/Task";
import type { QueryResult } from "@shared/config/types";

export const useTasksListQuery =
  (search: TasksRequestParams) => (): QueryResult<Task> => {
    const { data } = useSuspenseQuery(taskQuery.list(search));
    return { data: data.data };
  };

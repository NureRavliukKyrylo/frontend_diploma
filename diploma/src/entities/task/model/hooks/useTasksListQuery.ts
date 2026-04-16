import type { TaskSearchParams } from "../../libs";
import { taskQuery } from "../queries/taskQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Task } from "../types/Task";
import type { QueryResult } from "@shared/config/types";

export const useTasksListQuery =
  (search: TaskSearchParams) => (): QueryResult<Task> => {
    const { data } = useSuspenseQuery(taskQuery.list(search));
    return { data: data.data };
  };

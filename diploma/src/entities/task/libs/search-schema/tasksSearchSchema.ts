import { z } from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";
import { taskDrawerSchema } from "./taskDrawerSchema";

export const tasksSearchDefaults = {
  tab: "tasks" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  taskId: undefined,
  taskMode: "overview" as const,
};

export const tasksFiltersSchema = z.object({});

export const tasksSearchSchema = tasksFiltersSchema
  .extend(tasksTabBaseSchema.shape)
  .extend(taskDrawerSchema.shape);

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;
export type TasksRequestParams = Omit<
  z.infer<typeof tasksSearchSchema>,
  "tab" | "taskMode" | "taskId"
>;

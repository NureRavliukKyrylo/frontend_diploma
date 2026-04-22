import { z } from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";

export const tasksSearchDefaults = {
  tab: "tasks" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
};

export const tasksFiltersSchema = z.object({});

export const tasksSearchSchema = tasksFiltersSchema
  .extend(tasksTabBaseSchema.shape)
  .extend({ PageSize: z.number().min(1).default(9) });

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;
export type TasksRequestParams = Omit<z.infer<typeof tasksSearchSchema>, "tab">;

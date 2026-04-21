import { z } from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";

export const tasksSearchDefaults = {
  tab: "tasks" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
};

export const tasksFiltersSchema = z.object({
  PageSize: z.number().min(1).default(9),
});

export const tasksSearchSchema = tasksFiltersSchema.extend(
  tasksTabBaseSchema.shape,
);

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;

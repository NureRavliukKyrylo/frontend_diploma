import { z } from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";
import { taskDrawerDefaults } from "./taskDrawerSchema";

export const tasksSearchDefaults = {
  tab: "tasks" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  taskId: undefined,
  ...taskDrawerDefaults.overview,
};

export const tasksFiltersSchema = z.object({
  taskId: z.string().optional(),
  taskMode: z
    .enum(["overview", "members", "feedbacks"])
    .optional()
    .catch(undefined),
});

export const tasksSearchSchema = tasksFiltersSchema
  .extend(tasksTabBaseSchema.shape)
  .extend({
    DrawerPageSize: z.number().optional(),
    DrawerOrderBy: z.enum(["Default", "Newest", "Latest"]).optional(),
  });

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;
export type TasksRequestParams = Omit<
  z.infer<typeof tasksSearchSchema>,
  "tab" | "taskMode" | "taskId" | "DrawerPageSize" | "DrawerOrderBy"
>;

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
  SkillIds: z.array(z.string()).optional().catch(undefined),
  CategoryIds: z.array(z.string()).optional().catch([]),
  Rating: z.number().min(0).max(5).optional().catch(5),
});

export const tasksSearchSchema = tasksFiltersSchema
  .extend(tasksTabBaseSchema.shape)
  .extend({
    DrawerPageSize: z.number().optional(),
    DrawerOrderBy: z
      .enum(["Default", "DateAsc", "DateDesc", "RatingAsc", "RatingDesc"])
      .optional(),
  });

export const tasksNoCategoriesSchema = tasksSearchSchema.omit({
  CategoryIds: true,
});

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;
export type TasksRequestParams = Omit<
  z.infer<typeof tasksSearchSchema>,
  "tab" | "taskMode" | "taskId" | "DrawerPageSize" | "DrawerOrderBy"
>;
export type TaskSearchParamsNoCategories = Omit<
  TaskSearchParams,
  "CategoryIds"
>;

import { taskDrawerDefaults } from "@entities/task";
import z from "zod";

export const joinedProjectDefaults = {
  overview: {
    tab: "overview" as const,
  },
  feedback: {
    tab: "feedback" as const,
    PageSize: 3,
    OrderBy: "Default" as const,
  },
  tasks: {
    tab: "tasks" as const,
    PageSize: 4,
    ...taskDrawerDefaults.overview,
  },
};

export const overviewSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export const feedbackSchema = z.object({
  tab: z.literal("feedback"),
  PageSize: z.number().default(3).catch(3),
  OrderBy: z
    .enum(["Default", "Newest", "Latest"])
    .default("Default")
    .catch("Default"),
});

export const tasksSchema = z.object({
  tab: z.literal("tasks"),
  PageSize: z.number().default(4).catch(4),
  DrawerPageSize: z.number().optional(),
  DrawerOrderBy: z.enum(["Default", "Newest", "Latest"]).optional(),
  taskId: z.string().optional(),
  taskMode: z
    .enum(["overview", "members", "feedbacks"])
    .optional()
    .catch(undefined),
});

export const joinedProjectSearchSchema = z
  .discriminatedUnion("tab", [overviewSchema, feedbackSchema, tasksSchema])
  .catch({ ...joinedProjectDefaults.overview });

export type JoinedProjectSearch = z.infer<typeof joinedProjectSearchSchema>;
export type OverviewSearch = z.infer<typeof overviewSchema>;
export type FeedbackSearch = z.infer<typeof feedbackSchema>;
export type TasksSearch = z.infer<typeof tasksSchema>;

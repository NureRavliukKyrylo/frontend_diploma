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
    PageSize: 2,
  },
};

export const overviewSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export const feedbackSchema = z.object({
  tab: z.literal("feedback"),
});

export const tasksSchema = z.object({
  tab: z.literal("tasks"),
  PageSize: z.number().default(2).catch(2),
  taskId: z.string().optional(),
});

export const joinedProjectSearchSchema = z
  .discriminatedUnion("tab", [overviewSchema, feedbackSchema, tasksSchema])
  .catch({ ...joinedProjectDefaults.overview });

export type JoinedProjectSearch = z.infer<typeof joinedProjectSearchSchema>;
export type OverviewSearch = z.infer<typeof overviewSchema>;
export type FeedbackSearch = z.infer<typeof feedbackSchema>;
export type TasksSearch = z.infer<typeof tasksSchema>;

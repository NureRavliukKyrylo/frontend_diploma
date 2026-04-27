import z from "zod";

export const eventDetailDefaults = {
  overview: {
    tab: "overview" as const,
  },
  members: {
    tab: "members" as const,
    PageSize: 8,
  },
  feedback: {
    tab: "feedback" as const,
    PageSize: 3,
    OrderBy: "default" as const,
  },
  tasks: {
    tab: "tasks" as const,
    PageSize: 4,
  },
};

export const overviewSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export const membersSchema = z.object({
  tab: z.literal("members"),
  PageSize: z.number().default(8).catch(8),
});

export const feedbackSchema = z.object({
  tab: z.literal("feedback"),
  PageSize: z.number().default(3).catch(3),
  OrderBy: z
    .enum(["default", "date", "asc", "desc"])
    .default("default")
    .catch("default"),
});

export const tasksSchema = z.object({
  tab: z.literal("tasks"),
  PageSize: z.number().default(4).catch(4),
});

export const eventDetailSearchSchema = z
  .discriminatedUnion("tab", [
    overviewSchema,
    membersSchema,
    feedbackSchema,
    tasksSchema,
  ])
  .catch({ ...eventDetailDefaults.overview });

export type EventDetailSearch = z.infer<typeof eventDetailSearchSchema>;
export type OverviewEventSearch = z.infer<typeof overviewSchema>;
export type MembersEventSearch = z.infer<typeof membersSchema>;
export type FeedbackEventSearch = z.infer<typeof feedbackSchema>;
export type TasksEventSearch = z.infer<typeof tasksSchema>;

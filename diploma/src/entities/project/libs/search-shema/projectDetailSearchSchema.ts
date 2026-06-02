import { taskDrawerDefaults } from "@entities/task";
import z from "zod";

export const projectDetailDefaults = {
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
    OrderBy: "Default" as const,
  },
  events: {
    tab: "events" as const,
    PageSize: 6,
    Page: 1,
  },
  tasks: {
    tab: "tasks" as const,
    PageSize: 2,
    ...taskDrawerDefaults.overview,
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
    .enum(["Default", "DateAsc", "DateDesc", "RatingAsc", "RatingDesc"])
    .default("Default")
    .catch("Default"),
});

export const eventsSchema = z.object({
  tab: z.literal("events"),
  PageSize: z.number().default(6).catch(6),
  Page: z.number().default(1).catch(1),
});

export const tasksSchema = z.object({
  tab: z.literal("tasks"),
  PageSize: z.number().default(2).catch(2),
  DrawerPageSize: z.number().optional(),
  DrawerOrderBy: z
    .enum(["Default", "DateAsc", "DateDesc", "RatingAsc", "RatingDesc"])
    .optional(),
  taskId: z.string().optional(),
  taskMode: z
    .enum(["overview", "comments", "members", "feedbacks"])
    .optional()
    .catch(undefined),
});

export const projectDetailSearchSchema = z
  .discriminatedUnion("tab", [
    overviewSchema,
    membersSchema,
    feedbackSchema,
    eventsSchema,
    tasksSchema,
  ])
  .catch({ ...projectDetailDefaults.overview });

export type ProjectDetailSearch = z.infer<typeof projectDetailSearchSchema>;
export type OverviewSearch = z.infer<typeof overviewSchema>;
export type MembersSearch = z.infer<typeof membersSchema>;
export type FeedbackSearch = z.infer<typeof feedbackSchema>;
export type EventsSearch = z.infer<typeof eventsSchema>;
export type TasksSearch = z.infer<typeof tasksSchema>;

import { z } from "zod";

export const taskDrawerDefaults = {
  overview: {
    taskMode: "overview" as const,
  },
  members: {
    taskMode: "members" as const,
    DrawerPageSize: 8,
  },
  feedbacks: {
    taskMode: "feedbacks" as const,
    DrawerPageSize: 3,
    DrawerOrderBy: "default" as const,
  },
};
const taskDrawerOverviewSchema = z.object({
  taskMode: z.literal("overview").default("overview").catch("overview"),
  taskId: z.string().optional(),
});

const taskDrawerMembersSchema = z.object({
  taskMode: z.literal("members"),
  taskId: z.string().optional(),
  DrawerPageSize: z.number().default(8).catch(8),
});

const taskDrawerFeedbacksSchema = z.object({
  taskMode: z.literal("feedbacks"),
  taskId: z.string().optional(),
  DrawerPageSize: z.number().default(3).catch(3),
  DrawerOrderBy: z
    .enum(["default", "date", "asc", "desc"])
    .default("default")
    .catch("default"),
});

export const taskDrawerSchema = z
  .discriminatedUnion("taskMode", [
    taskDrawerOverviewSchema,
    taskDrawerMembersSchema,
    taskDrawerFeedbacksSchema,
  ])
  .catch({ ...taskDrawerDefaults.overview });

export type TaskDetailSearch = z.infer<typeof taskDrawerSchema>;
export type MembersTaskSearch = z.infer<typeof taskDrawerMembersSchema>;
export type FeedbackTaskSearch = z.infer<typeof taskDrawerFeedbacksSchema>;

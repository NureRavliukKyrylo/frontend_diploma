import z from "zod";

export const eventJoinedDefaults = {
  overview: {
    tab: "overview" as const,
  },
  attendance: {
    tab: "attendance" as const,
  },
  feedback: {
    tab: "feedback" as const,
  },
  tasks: {
    tab: "tasks" as const,
    PageSize: 4,
  },
};

export const overviewSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export const attendanceSchema = z.object({
  tab: z.literal("attendance"),
  From: z.string().optional(),
  To: z.string().optional(),
});

export const feedbackSchema = z.object({
  tab: z.literal("feedback"),
});

export const tasksSchema = z.object({
  tab: z.literal("tasks"),
  PageSize: z.number().default(4).catch(4),
});

export const eventJoinedSearchSchema = z
  .discriminatedUnion("tab", [
    overviewSchema,
    attendanceSchema,
    feedbackSchema,
    tasksSchema,
  ])
  .catch({ ...eventJoinedDefaults.overview });

export type JoinedEventSearch = z.infer<typeof eventJoinedSearchSchema>;
export type OverviewEventSearch = z.infer<typeof overviewSchema>;
export type AttendanceEventSearch = z.infer<typeof attendanceSchema>;
export type FeedbackEventSearch = z.infer<typeof feedbackSchema>;
export type TasksEventSearch = z.infer<typeof tasksSchema>;

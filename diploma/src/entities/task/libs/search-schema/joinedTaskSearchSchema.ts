import z from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";

export const taskDrawerJoinedDefaults = {
  comments: {
    taskMode: "comments" as const,
    PageSize: 2,
    CommentsPageSize: 7,
  },
  feedback: {
    taskMode: "feedback" as const,
  },
};

export const joinedTaskSearchModeSchema = z.object({
  taskId: z.string().optional(),
  taskMode: z.enum(["comments", "feedback"]).optional().catch(undefined),
  PageSize: z.number().default(2).catch(2),
  CommentsPageSize: z.number().default(7).catch(7),
});

export const joinedTaskSearchSchema = joinedTaskSearchModeSchema.extend(
  tasksTabBaseSchema.shape,
);

export type MyTasksSearchParams = z.infer<typeof joinedTaskSearchSchema>;

export type MyTasksRequestParams = Omit<
  z.infer<typeof joinedTaskSearchSchema>,
  "tab" | "taskMode" | "taskId" | "CommentsPageSize"
>;

export type TaskDrawerJoinedSearch = z.infer<typeof joinedTaskSearchModeSchema>;

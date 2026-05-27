import z from "zod";
import { tasksTabBaseSchema } from "./taskTabSchema";

export const taskDrawerJoinedDefaults = {
  comments: {
    taskMode: "comments" as const,
  },
  feedback: {
    taskMode: "feedback" as const,
  },
};

const joinedTaskSearchModeSchema = z.object({
  taskMode: z.enum(["comments", "feedback"]).optional().catch(undefined),
});

export const joinedTaskSearchSchema = joinedTaskSearchModeSchema
  .extend(tasksTabBaseSchema.shape)
  .extend({
    taskId: z.string().optional(),
    taskMode: z.enum(["comments", "feedback"]).optional().catch(undefined),
  });

export type MyTasksSearchParams = z.infer<typeof joinedTaskSearchSchema>;

export type MyTasksRequestParams = Omit<
  z.infer<typeof joinedTaskSearchSchema>,
  "tab" | "taskMode" | "taskId" | "DrawerPageSize" | "DrawerOrderBy"
>;

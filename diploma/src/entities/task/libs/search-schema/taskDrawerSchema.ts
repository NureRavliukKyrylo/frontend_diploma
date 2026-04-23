import { z } from "zod";

export const taskDrawerDefaults = {
  taskId: undefined,
  taskMode: "overview" as const,
};

export const taskDrawerSchema = z.object({
  taskId: z.string().optional(),
  taskMode: z
    .enum(["overview", "members", "feedbacks"])
    .default("overview")
    .catch("overview")
    .optional(),
});

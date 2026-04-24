import { z } from "zod";

export const taskDrawerSchema = z.object({
  taskId: z.string().optional(),
  taskMode: z
    .enum(["overview", "members", "feedbacks"])
    .default("overview")
    .catch("overview")
    .optional(),
});

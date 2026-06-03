import { paginationSchema } from "@shared/config/schemas";
import z from "zod";

export const tasksTabDefaults = {
  tab: "tasks" as const,
  Page: 1,
  PageSize: 5,
  OrderBy: "Default" as const,
  OnlyActive: false,
};

export const tasksOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const tasksTabBaseShape = z.object({
  tab: z.literal("tasks"),
  Status: z
    .enum(["Completed", "Pending", "InProgress", "Cancelled"])
    .optional()
    .catch("Completed"),
  From: z.string().optional(),
  To: z.string().optional(),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  EventIds: z.array(z.string()).optional().catch(undefined),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  Search: z.string().optional(),
  OnlyActive: z.boolean().optional(),
});

export const tasksTabBaseSchema = tasksTabBaseShape
  .extend(tasksOrderSchema.shape)
  .extend(paginationSchema.shape);

export const tasksTabSchema = tasksTabBaseSchema.extend({
  PageSize: z.number().min(1).default(tasksTabDefaults.PageSize),
});

export type TaskPaginationParams = z.infer<typeof paginationSchema>;

import { z } from "zod";
import { paginationSchema } from "@shared/config/schemas";

export const tasksSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
};

export const tasksOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const tasksFiltersSchema = z.object({
  From: z.string().optional(),
  To: z.string().optional(),
  Search: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  EventIds: z.array(z.string()).optional().catch(undefined),
});

export const tasksSearchSchema = tasksFiltersSchema
  .extend(tasksOrderSchema.shape)
  .extend(paginationSchema.shape);

export type TaskSearchParams = z.infer<typeof tasksSearchSchema>;

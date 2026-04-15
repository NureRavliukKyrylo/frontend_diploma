import { z } from "zod";
import { paginationSchema, locationSchema } from "@shared/config/schemas";

export const eventSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
  IncludeSeriesMasters: false,
};

export const eventOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const eventsFiltersSchema = z.object({
  Rating: z.number().min(0).max(5).optional().catch(5),
  From: z.string().optional(),
  To: z.string().optional(),
  Search: z.string().optional(),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  IncludeSeriesMasters: z.boolean().optional(),
  ShowJoined: z.boolean().optional(),
  IncludeArchived: z.boolean().optional(),
});

export const eventsSearchSchema = eventsFiltersSchema
  .extend(eventOrderSchema.shape)
  .extend(paginationSchema.shape)
  .extend(locationSchema.shape);

export type EventSearchParams = z.infer<typeof eventsSearchSchema>;
export type EventPaginationParams = z.infer<typeof paginationSchema>;

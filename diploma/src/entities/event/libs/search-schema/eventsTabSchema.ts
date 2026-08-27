import { paginationSchema, locationSchema } from "@shared/config/schemas";
import z from "zod";

export const eventsTabDefaults = {
  tab: "events" as const,
  Page: 1,
  PageSize: 9,
  OrderBy: "Default" as const,
  IncludeArchived: false,
};

export const eventOrderSchema = z.object({
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
});

export const eventsTabBaseShape = z.object({
  tab: z.literal("events"),
  From: z.string().optional(),
  To: z.string().optional(),
  ProjectIds: z.array(z.string()).optional().catch(undefined),
  OrganizationIds: z.array(z.string()).optional().catch(undefined),
  Search: z.string().optional(),
});

export const eventsTabBaseSchema = eventsTabBaseShape
  .extend(eventOrderSchema.shape)
  .extend(locationSchema.shape)
  .extend(paginationSchema.shape);

export const eventsTabSchema = eventsTabBaseSchema.extend({
  IncludeArchived: z.boolean().optional().default(false),
});

export type MyEventsSearchParams = z.infer<typeof eventsTabSchema>;
export type MyEventsRequestParams = Omit<MyEventsSearchParams, "tab">;
export type EventPaginationParams = z.infer<typeof paginationSchema>;

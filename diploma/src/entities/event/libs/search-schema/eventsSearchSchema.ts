import { z } from "zod";
import { locationSchema } from "@shared/config/schemas";
import { eventsTabBaseSchema } from "./eventsTabSchema";

export const eventSearchDefaults = {
  tab: "events" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
  IncludeSeriesMasters: false,
};

export const eventsFiltersSchema = z.object({
  Rating: z.number().min(0).max(5).optional().catch(5),
  IncludeSeriesMasters: z.boolean().optional(),
  ShowJoined: z.boolean().optional().catch(false),
  IncludeArchived: z.boolean().optional(),
  SkillIds: z.array(z.string()).optional().catch(undefined),
});

export const eventsSearchSchema = eventsFiltersSchema
  .extend(eventsTabBaseSchema.shape)
  .extend(locationSchema.shape);

export type EventSearchParams = z.infer<typeof eventsSearchSchema>;
export type EventRequestParams = Omit<
  z.infer<typeof eventsSearchSchema>,
  "tab"
>;

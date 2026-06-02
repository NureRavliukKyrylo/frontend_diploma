import { z } from "zod";
import { locationSchema, paginationSchema } from "@shared/config/schemas";

export const offerSearchDefaults = {
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
  IncludeSeriesMasters: false,
};

export const offersFiltersSchema = z.object({
  From: z.string().optional(),
  To: z.string().optional(),
  IncludeArchived: z.boolean().optional(),
  SkillIds: z.array(z.string()).optional().catch(undefined),
  CategoryIds: z.array(z.string()).optional().catch([]),
  IsOnline: z.boolean().optional(),
  OrderBy: z
    .enum(["Default", "Newest", "TitleAsc", "TitleDesc", "EndingSoon"])
    .default("Default")
    .catch("Default")
    .optional(),
  Search: z.string().optional(),
});

export const offersSearchSchema = offersFiltersSchema
  .extend(locationSchema.shape)
  .extend(paginationSchema.shape)
  .extend({ ShowJoined: z.boolean().optional().catch(false) });

export type OfferSearchParams = z.infer<typeof offersSearchSchema>;

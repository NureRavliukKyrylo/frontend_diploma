import { z } from "zod";
import { locationSchema, paginationSchema } from "@shared/config/schemas";

export const offerSearchDefaults = {
  tab: "offers" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 12,
};

export const overviewSearchDefaults = {
  tab: "overview" as const,
};

export const offersFiltersSchema = z.object({
  tab: z.literal("offers").default("offers").catch("offers"),
  From: z.string().optional(),
  To: z.string().optional(),
  IncludeArchived: z.boolean().optional(),
  SkillIds: z.array(z.string()).optional().catch(undefined),
  CategoryIds: z.array(z.string()).optional().catch([]),
  IsOnline: z.boolean().optional(),
  OrderBy: z
    .enum([
      "Default",
      "Newest",
      "TitleAsc",
      "TitleDesc",
      "EndingSoon",
      "PriceMinutesAsc",
      "PriceMinutesDesc",
    ])
    .default("Default")
    .catch("Default")
    .optional(),
  Search: z.string().optional(),
});

export const offersSearchSchema = offersFiltersSchema
  .extend(locationSchema.shape)
  .extend(paginationSchema.shape)
  .extend({ PageSize: z.number().default(12) })
  .extend({ ShowJoined: z.boolean().optional().catch(false) });

export const overviewSearchSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export type OfferSearchParams = Omit<z.infer<typeof offersSearchSchema>, "tab">;

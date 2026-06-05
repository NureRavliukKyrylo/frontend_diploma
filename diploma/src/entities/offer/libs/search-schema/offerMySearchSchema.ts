import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import z from "zod";

export const myOffersSearchDefaults = {
  tab: "my-offers" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 12,
};

export const offersMySearchSchema = offersFiltersSchema
  .extend(paginationSchema.shape)
  .extend({
    tab: z.literal("my-offers").default("my-offers").catch("my-offers"),
  })
  .extend({ PageSize: z.number().default(12) })
  .omit({ SkillIds: true, CategoryIds: true });

export type OfferMySearchParams = Omit<
  z.infer<typeof offersMySearchSchema>,
  "tab"
>;

import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import z from "zod";

export const myOffersSearchDefaults = {
  tab: "my-offers" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
  isOnline: false,
};

export const offersMySearchSchema = offersFiltersSchema
  .extend(paginationSchema.shape)
  .extend({
    tab: z.literal("my-offers").default("my-offers").catch("my-offers"),
  });

export type OfferMySearchParams = z.infer<typeof offersMySearchSchema>;

import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import z from "zod";

export const bookingsSearchDefaults = {
  tab: "bookings" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 12,
};

export const bookingsSearchSchema = offersFiltersSchema
  .extend(paginationSchema.shape)
  .extend({
    tab: z.literal("bookings").default("bookings").catch("bookings"),
  });

export type OfferJoinedSearchParams = Omit<
  z.infer<typeof bookingsSearchSchema>,
  "tab"
>;

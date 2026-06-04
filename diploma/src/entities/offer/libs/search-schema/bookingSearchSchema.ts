import { paginationSchema } from "@shared/config/schemas";
import { offersFiltersSchema } from "./offersSearchSchema";
import z from "zod";

export const bookingsSearchDefaults = {
  tab: "bookings" as const,
  OrderBy: "Default" as const,
  Page: 1,
  PageSize: 9,
  IncludeArchived: false,
  ShowJoined: false,
  isOnline: false,
};

export const bookingsSearchSchema = offersFiltersSchema
  .extend(paginationSchema.shape)
  .extend({
    tab: z.literal("bookings").default("bookings").catch("bookings"),
  });

export type OfferJoinedSearchParams = z.infer<typeof bookingsSearchSchema>;

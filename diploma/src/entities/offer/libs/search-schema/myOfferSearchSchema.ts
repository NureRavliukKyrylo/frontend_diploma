import z from "zod";

export const myOfferDetailDefaults = {
  overview: {
    tab: "overview" as const,
  },
  bookings: {
    tab: "bookings" as const,
    PageSize: 8,
  },
};

export const overviewSchema = z.object({
  tab: z.literal("overview").default("overview").catch("overview"),
});

export const bookingsSchema = z.object({
  tab: z.literal("bookings"),
  PageSize: z.number().default(8).catch(8),
});

export const myOfferSearchSchema = z
  .discriminatedUnion("tab", [overviewSchema, bookingsSchema])
  .catch({ ...myOfferDetailDefaults.overview });

export type MyOfferSearch = z.infer<typeof myOfferSearchSchema>;
export type OverviewMyOfferSearch = z.infer<typeof overviewSchema>;
export type BookingsOfferSearch = z.infer<typeof bookingsSchema>;

import {
  bookingsSearchDefaults,
  bookingsSearchSchema,
  myOffersSearchDefaults,
  offerSearchDefaults,
  offersMySearchSchema,
  offersSearchSchema,
} from "@entities/offer";
import z from "zod";
import type { TimeBankMode } from "../config/TimeBankMode";

export const timeBankSearchDefaults = {
  offers: offerSearchDefaults,
  "my-offers": myOffersSearchDefaults,
  bookings: bookingsSearchDefaults,
};

export const timeBankSearchSchema = z
  .discriminatedUnion("tab", [
    offersSearchSchema,
    offersMySearchSchema,
    bookingsSearchSchema,
  ])
  .catch((ctx) => {
    const input = ctx.value as any;
    const tab = input?.tab ?? "offers";
    const defaults = timeBankSearchDefaults[tab as TimeBankMode];
    return { ...defaults, ...input };
  });

export type TimeBankSearch = z.infer<typeof timeBankSearchSchema>;

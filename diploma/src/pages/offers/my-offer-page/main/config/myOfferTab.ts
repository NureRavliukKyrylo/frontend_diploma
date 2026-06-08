import type { TabOption } from "@shared/config/types";

export type MyOfferMode = "overview" | "bookings";

export const myOfferMainTabs: TabOption<MyOfferMode>[] = [
  { label: "OVERVIEW", value: "overview" },
  { label: "BOOKINGS", value: "bookings" },
];

import type { TFunction } from "i18next";
import type { TabOption } from "@shared/config/types";

export type MyOfferMode = "overview" | "bookings";

export const getMyOfferMainTabs = (t: TFunction): TabOption<MyOfferMode>[] => [
  { label: t("timeBank:myOfferPage.tabs.overview"), value: "overview" },
  { label: t("timeBank:myOfferPage.tabs.bookings"), value: "bookings" },
];

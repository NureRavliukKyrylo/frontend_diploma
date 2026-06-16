import type { TFunction } from "i18next";
import type { TimeBankMode } from "./TimeBankMode";

export interface TimeBankTabOption {
  label: string;
  value: TimeBankMode;
}

export const getTimeBankTabs = (t: TFunction): TimeBankTabOption[] => [
  { label: t("tabs.overview"), value: "overview" },
  { label: t("tabs.offers"), value: "offers" },
  { label: t("tabs.bookings"), value: "bookings" },
  { label: t("tabs.myOffers"), value: "my-offers" },
  { label: t("tabs.transactions"), value: "transactions" },
];

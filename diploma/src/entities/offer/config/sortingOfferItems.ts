import type { SortOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export type OfferSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon"
  | "PriceMinutesAsc"
  | "PriceMinutesDesc";

export const getSortingOfferItems = (
  t: TFunction,
): SortOption<OfferSortValues>[] => [
  { label: t("common:sorting.default"), value: "Default" },
  { label: t("common:sorting.titleAsc"), value: "TitleAsc" },
  { label: t("common:sorting.titleDesc"), value: "TitleDesc" },
  { label: t("common:sorting.newest"), value: "Newest" },
  { label: t("common:sorting.endingSoon"), value: "EndingSoon" },
  { label: t("common:sorting.priceMinutesAsc"), value: "PriceMinutesAsc" },
  { label: t("common:sorting.priceMinutesDesc"), value: "PriceMinutesDesc" },
];

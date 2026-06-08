import type { SortOption } from "@shared/config/types";

export type OfferSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon"
  | "PriceMinutesAsc"
  | "PriceMinutesDesc";

export const sortingOfferItems: SortOption<OfferSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Title A-Z", value: "TitleAsc" },
  { label: "Title Z-A", value: "TitleDesc" },
  { label: "Newest", value: "Newest" },
  { label: "Ending Soon", value: "EndingSoon" },
  { label: "Lowest Reward", value: "PriceMinutesAsc" },
  { label: "Highest Reward", value: "PriceMinutesDesc" },
];

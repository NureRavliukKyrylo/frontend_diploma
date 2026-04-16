import type { SortOption } from "@shared/config/types";

export type EventSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon";

export const sortingEventItems: SortOption<EventSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Title A-Z", value: "TitleAsc" },
  { label: "Title Z-A", value: "TitleDesc" },
  { label: "Newest", value: "Newest" },
  { label: "Ending Soon", value: "EndingSoon" },
];

import type { SortOption, SortValues } from "@shared/config/types";

export const sortingItems: SortOption<SortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Newest", value: "Newest" },
  { label: "Title A → Z", value: "TitleAsc" },
  { label: "Title Z → A", value: "TitleDesc" },
  { label: "Ending Soon", value: "EndingSoon" },
];

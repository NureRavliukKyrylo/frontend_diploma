import type { SortOption } from "@shared/config/types";

export type TaskSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon";

export const sortingTaskItems: SortOption<TaskSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Title A-Z", value: "TitleAsc" },
  { label: "Title Z-A", value: "TitleDesc" },
  { label: "Newest", value: "Newest" },
  { label: "Ending Soon", value: "EndingSoon" },
];

import type { SortOption } from "@shared/config/types";

export type FeedbackSortValues = "Default" | "Newest" | "Latest";

export const sortingFeedbackItems: SortOption<FeedbackSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Recent", value: "Newest" },
  { label: "Latest", value: "Latest" },
];

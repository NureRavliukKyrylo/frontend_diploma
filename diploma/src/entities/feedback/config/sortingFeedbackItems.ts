import type { SortOption } from "@shared/config/types";

export type FeedbackSortValues =
  | "Default"
  | "DateAsc"
  | "DateDesc"
  | "RatingAsc"
  | "RatingDesc";

export const sortingFeedbackItems: SortOption<FeedbackSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Recent", value: "DateAsc" },
  { label: "Latest", value: "DateDesc" },
  { label: "Top Rated", value: "RatingDesc" },
  { label: "Low Rated", value: "RatingAsc" },
];

import type { SortOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export type FeedbackSortValues =
  | "Default"
  | "DateAsc"
  | "DateDesc"
  | "RatingAsc"
  | "RatingDesc";

export const getSortingFeedbackItems = (
  t: TFunction,
): SortOption<FeedbackSortValues>[] => [
  {
    label: t("common:sorting.default", { defaultValue: "Default" }),
    value: "Default",
  },
  {
    label: t("common:sorting.dateAsc", { defaultValue: "Recent" }),
    value: "DateAsc",
  },
  {
    label: t("common:sorting.dateDesc", { defaultValue: "Latest" }),
    value: "DateDesc",
  },
  {
    label: t("common:sorting.ratingDesc", { defaultValue: "Top Rated" }),
    value: "RatingDesc",
  },
  {
    label: t("common:sorting.ratingAsc", { defaultValue: "Low Rated" }),
    value: "RatingAsc",
  },
];

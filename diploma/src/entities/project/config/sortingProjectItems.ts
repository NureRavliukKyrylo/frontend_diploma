import type { SortOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export type ProjectSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon";

export const getSortingProjectItems = (
  t: TFunction,
): SortOption<ProjectSortValues>[] => [
  { label: t("common:sorting.default"), value: "Default" },
  { label: t("common:sorting.titleAsc"), value: "TitleAsc" },
  { label: t("common:sorting.titleDesc"), value: "TitleDesc" },
  { label: t("common:sorting.newest"), value: "Newest" },
  { label: t("common:sorting.endingSoon"), value: "EndingSoon" },
];

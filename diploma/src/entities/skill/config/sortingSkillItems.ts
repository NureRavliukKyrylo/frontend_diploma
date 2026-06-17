import type { SortOption } from "@shared/config/types";
import type { TFunction } from "i18next";

export type SortSkillsValues = "Default" | "NameAsc" | "NameDesc";

export const getSortingSkillItems = (
  t: TFunction,
): SortOption<SortSkillsValues>[] => [
  { label: t("common:sorting.default"), value: "Default" },
  { label: t("common:sorting.titleAsc"), value: "NameAsc" },
  { label: t("common:sorting.titleDesc"), value: "NameDesc" },
];

import type { SortOption } from "@shared/config/types";

type SortSkillsValues = "Default" | "NameAsc" | "NameDesc";

export const sortingItems: SortOption<SortSkillsValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Name A-Z", value: "NameAsc" },
  { label: "Name Z-A", value: "NameDesc" },
];

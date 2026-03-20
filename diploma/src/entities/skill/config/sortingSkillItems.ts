import type { SortOption } from "@shared/config/types";

export type SortSkillsValues = "Default" | "NameAsc" | "NameDesc";

export const sortingSkillItems: SortOption<SortSkillsValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Name A-Z", value: "NameAsc" },
  { label: "Name Z-A", value: "NameDesc" },
];

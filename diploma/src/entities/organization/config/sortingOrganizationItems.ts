import type { SortOption } from "@shared/config/types";

export type OrganizationSortValues =
  | "Default"
  | "Newest"
  | "TitleAsc"
  | "TitleDesc"
  | "EndingSoon";

export const sortingOrganizationsItems: SortOption<OrganizationSortValues>[] = [
  { label: "Default", value: "Default" },
  { label: "Title A-Z", value: "TitleAsc" },
  { label: "Title Z-A", value: "TitleDesc" },
  { label: "Newest", value: "Newest" },
  { label: "Ending Soon", value: "EndingSoon" },
];

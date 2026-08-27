import type { SortValue, StatusDropDownValue } from "../model/types";

export const statusOptions: { value: StatusDropDownValue; label: string }[] = [
  { value: "status:all", label: "admin:users.toolbar.allStatuses" },
  { value: "status:verified", label: "admin:users.metrics.verified" },
  { value: "status:unverified", label: "admin:users.metrics.unverified" },
  { value: "status:google", label: "admin:users.toolbar.googleConnected" },
];

export const sortOptions: { value: SortValue; label: string }[] = [
  { value: "Newest", label: "admin:users.toolbar.newest" },
  { value: "Oldest", label: "admin:users.toolbar.oldest" },
  { value: "Email", label: "admin:users.toolbar.email" },
  { value: "Name", label: "admin:users.toolbar.name" },
  { value: "Role", label: "admin:users.toolbar.role" },
];

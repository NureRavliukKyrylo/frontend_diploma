import type { SortValue, StatusDropDownValue } from "../model/types";

export const statusOptions: { value: StatusDropDownValue; label: string }[] = [
  { value: "status:all", label: "All statuses" },
  { value: "status:verified", label: "Verified" },
  { value: "status:unverified", label: "Unverified" },
  { value: "status:google", label: "Google connected" },
];

export const sortOptions: { value: SortValue; label: string }[] = [
  { value: "Newest", label: "Newest first" },
  { value: "Oldest", label: "Oldest first" },
  { value: "Email", label: "Email" },
  { value: "Name", label: "Name" },
  { value: "Role", label: "Role" },
];

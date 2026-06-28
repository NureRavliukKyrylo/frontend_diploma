export type StatusFilter = "all" | "verified" | "unverified" | "google";
export type RoleFilter = "all" | `role:${string}`;
export type StatusDropDownValue = `status:${StatusFilter}`;
export type RoleTone = "admin" | "moderator" | "user";
export type RequestStatusTone =
  | "new"
  | "inProgress"
  | "resolved"
  | "rejected"
  | "appealed"
  | "cancelled";
export type SortValue = "Newest" | "Oldest" | "Email" | "Name" | "Role";
export type AdminUsersStyles = Record<string, string>;

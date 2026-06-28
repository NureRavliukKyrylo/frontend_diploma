import type {
  AdminUserListItem,
  AdminUsersParams,
  AdminUsersSearchParams,
} from "@entities/admin";
import type {
  AdminUsersStyles,
  RequestStatusTone,
  RoleTone,
  StatusFilter,
} from "../model/types";

type UnknownRecord = Record<string, unknown>;

const asRecord = (value: unknown): UnknownRecord =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};

const readString = (value: unknown, ...keys: string[]) => {
  const record = asRecord(value);
  const found = keys.map((key) => record[key]).find((item) => typeof item === "string");

  return typeof found === "string" ? found : "";
};

export const getRoleTone = (roleName?: string | null): RoleTone => {
  const normalized = (roleName ?? "").toLowerCase();

  if (normalized.includes("admin")) {
    return "admin";
  }

  if (normalized.includes("moderator")) {
    return "moderator";
  }

  return "user";
};

export const getInitials = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const source = user.displayName || fullName || user.email;
  const initials = source
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "IF";
};

export const getUserName = (user: AdminUserListItem) => {
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return user.displayName || fullName || user.email || "Unknown user";
};

export const enumToLabel = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const getStatusFilter = (
  search: AdminUsersSearchParams,
): StatusFilter => {
  if (search.GoogleConnected) {
    return "google";
  }

  if (search.EmailVerified === true) {
    return "verified";
  }

  if (search.EmailVerified === false) {
    return "unverified";
  }

  return "all";
};

export const getBanUserId = (ban: unknown) => readString(ban, "userId", "UserId");

export const getRoleName = (role: unknown) => readString(role, "name", "Name");

export const getRequestStatusTone = (status: string): RequestStatusTone => {
  const normalized = status.replace(/\s+/g, "").toLowerCase();

  if (normalized === "inprogress") {
    return "inProgress";
  }

  if (normalized === "resolved" || normalized === "appealresolved") {
    return "resolved";
  }

  if (normalized === "rejected") {
    return "rejected";
  }

  if (normalized === "appealed") {
    return "appealed";
  }

  if (normalized === "cancelled" || normalized === "canceled") {
    return "cancelled";
  }

  return "new";
};

export const buildUserParams = (
  search: AdminUsersSearchParams,
): AdminUsersParams => ({
  Search: search.Search || undefined,
  RoleName: search.RoleName || undefined,
  EmailVerified: search.EmailVerified,
  GoogleConnected: search.GoogleConnected,
  RegisteredFrom: search.RegisteredFrom || undefined,
  RegisteredTo: search.RegisteredTo || undefined,
  OrderBy: search.OrderBy,
  Page: search.Page,
  PageSize: search.PageSize,
});

export const getPageWindow = (page: number, totalPages: number) => {
  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, start + 2);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const getDatePickerClassNames = (styles: AdminUsersStyles) => ({
  base: styles.datePickerBase,
  inputWrapper: styles.datePickerInputWrapper,
  input: styles.datePickerInput,
  segment: styles.datePickerSegment,
  selectorIcon: styles.datePickerSelectorIcon,
});

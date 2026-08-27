import type { DurationFilter, SortValue } from "../model/types";

export const durationOptions: { value: DurationFilter; label: string }[] = [
  { value: "all", label: "admin:bans.filters.all" },
  { value: "permanent", label: "admin:bans.filters.permanent" },
  { value: "soon", label: "admin:bans.filters.soon" },
  { value: "long", label: "admin:bans.filters.long" },
];

export const sortOptions: { value: SortValue; label: string }[] = [
  { value: "newest", label: "admin:bans.filters.newest" },
  { value: "oldest", label: "admin:bans.filters.oldest" },
  { value: "expires", label: "admin:bans.filters.expiring" },
];

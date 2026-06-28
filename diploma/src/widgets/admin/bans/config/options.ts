import type { DurationFilter, SortValue } from "../model/types";

export const durationOptions: { value: DurationFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "permanent", label: "Permanent" },
  { value: "soon", label: "Expiring soon (<=7d)" },
  { value: "long", label: "Long-term (>7d)" },
];

export const sortOptions: { value: SortValue; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "expires", label: "Expiring soonest" },
];

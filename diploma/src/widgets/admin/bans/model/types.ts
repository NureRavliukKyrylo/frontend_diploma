import type { AdminBan, AdminUserListItem } from "@entities/admin";
import type { LucideIcon } from "lucide-react";

export type DurationFilter = "all" | "permanent" | "soon" | "long";
export type SortValue = "newest" | "oldest" | "expires";

export interface BanDisplay {
  ban: AdminBan;
  user?: AdminUserListItem;
  creator?: AdminUserListItem;
  tone: "permanent" | "soon" | "long";
  statusLabel: string;
  icon: LucideIcon;
}

export type AdminBansStyles = Record<string, string>;

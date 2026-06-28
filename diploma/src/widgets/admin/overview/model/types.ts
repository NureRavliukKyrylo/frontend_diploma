import type {
  AdminQueueItem,
  AdminSystemHealth,
  AdminUserListItem,
} from "@entities/admin";
import type { LucideIcon } from "lucide-react";

export type AdminOverviewStyles = Record<string, string>;

export type QuickAccessTone =
  | "users"
  | "bans"
  | "timeBank"
  | "skills"
  | "requests"
  | "statistics";

export type FooterSource =
  | "users"
  | "bans"
  | "timeBank"
  | "skills"
  | "requests";

export interface MetricCard {
  label: string;
  value: string;
  tone: "reports" | "requests" | "neutral";
  accent?: boolean;
  isLoading: boolean;
  isError: boolean;
}

export interface QuickAccessItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: QuickAccessTone;
  footerSource?: FooterSource;
  footerTone?: "neutral" | "danger" | "warning";
  footerAction: string;
}

export interface FooterValue {
  value: string;
  isLoading: boolean;
  isError: boolean;
}

export interface HealthRow {
  label: string;
  status: string;
  severity: "ok" | "warning" | "critical";
}

export interface ActivityFeedItem {
  id: string;
  type: "report" | "request";
  description: string;
  createdAt: string;
}

export type BuildActivityFeed = (
  reports?: AdminQueueItem[],
  requests?: AdminQueueItem[],
) => ActivityFeedItem[];

export type BuildHealthRows = (health?: AdminSystemHealth) => HealthRow[];

export type GetInitials = (user: AdminUserListItem) => string;

import {
  Ban,
  ChartBar,
  ClipboardList,
  Flag,
  LayoutDashboard,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavBadge {
  key: "users" | "bans" | "skills" | "requests";
  tone: "neutral" | "accent";
}

export interface AdminNavItem {
  title: string;
  href: string | null;
  searchLabel: string;
  icon: LucideIcon;
  badge?: AdminNavBadge;
}

export const adminNavItems: AdminNavItem[] = [
  {
    title: "Overview",
    href: "/admin",
    searchLabel: "Search overview",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    searchLabel: "Search users",
    icon: Users,
    badge: { key: "users", tone: "neutral" },
  },
  {
    title: "Bans",
    href: "/admin/bans",
    searchLabel: "Search bans",
    icon: Ban,
    badge: { key: "bans", tone: "accent" },
  },
  {
    title: "Skills",
    href: "/admin/skills",
    searchLabel: "Search skills",
    icon: Tag,
    badge: { key: "skills", tone: "neutral" },
  },
  {
    title: "Requests",
    href: "/admin/requests",
    searchLabel: "Search requests",
    icon: ClipboardList,
    badge: { key: "requests", tone: "neutral" },
  },
  {
    title: "Statistics",
    href: "/admin/statistics",
    searchLabel: "Search statistics",
    icon: ChartBar,
  },
];

export const moderationNavItem = {
  title: "Moderation",
  icon: Flag,
};

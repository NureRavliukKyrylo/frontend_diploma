import {
  Award,
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
    title: "admin:sidebar.items.overview",
    href: "/admin",
    searchLabel: "admin:sidebar.search.overview",
    icon: LayoutDashboard,
  },
  {
    title: "admin:sidebar.items.users",
    href: "/admin/users",
    searchLabel: "admin:sidebar.search.users",
    icon: Users,
    badge: { key: "users", tone: "neutral" },
  },
  {
    title: "admin:sidebar.items.bans",
    href: "/admin/bans",
    searchLabel: "admin:sidebar.search.bans",
    icon: Ban,
    badge: { key: "bans", tone: "accent" },
  },
  {
    title: "admin:sidebar.items.skills",
    href: "/admin/skills",
    searchLabel: "admin:sidebar.search.skills",
    icon: Tag,
    badge: { key: "skills", tone: "neutral" },
  },
  {
    title: "admin:sidebar.items.badges",
    href: "/admin/badges",
    searchLabel: "admin:sidebar.search.badges",
    icon: Award,
  },
  {
    title: "admin:sidebar.items.requests",
    href: "/admin/requests",
    searchLabel: "admin:sidebar.search.requests",
    icon: ClipboardList,
    badge: { key: "requests", tone: "neutral" },
  },
  {
    title: "admin:sidebar.items.statistics",
    href: "/admin/statistics",
    searchLabel: "admin:sidebar.search.statistics",
    icon: ChartBar,
  },
];

export const moderationNavItem = {
  title: "admin:sidebar.items.moderation",
  icon: Flag,
};

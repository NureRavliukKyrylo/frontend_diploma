import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Bookmark,
  CalendarDays,
  FolderKanban,
  Home,
  ListChecks,
  Map,
  MessageCircle,
  Settings,
  Shapes,
  Sparkles,
  Tags,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";

export interface SearchablePage {
  title: string;
  description: string;
  to: string;
  search?: Record<string, unknown>;
  keywords: string[];
  Icon: LucideIcon;
}

export const searchablePages: SearchablePage[] = [
  {
    title: "Home",
    description: "Main ImpactFlow page",
    to: "/",
    keywords: ["home", "main", "landing", "impactflow"],
    Icon: Home,
  },
  {
    title: "Profile",
    description: "Your profile, inventory, badges, and activity",
    to: "/profile",
    search: { tab: "profile" },
    keywords: ["profile", "account", "user", "badges", "inventory"],
    Icon: UserRound,
  },
  {
    title: "Profile Settings",
    description: "Personal, security, and profile preferences",
    to: "/profile/settings",
    search: { tab: "settings" },
    keywords: ["settings", "security", "password", "email", "preferences"],
    Icon: Settings,
  },
  {
    title: "Chat",
    description: "Your conversations and messages",
    to: "/chat",
    keywords: ["chat", "messages", "conversations", "inbox"],
    Icon: MessageCircle,
  },
  {
    title: "Notifications",
    description: "Updates, requests, and activity alerts",
    to: "/notifications",
    keywords: ["notifications", "alerts", "updates", "requests"],
    Icon: Bell,
  },
  {
    title: "Organizations",
    description: "Public organization catalog",
    to: "/organizations",
    keywords: ["organizations", "organization", "catalog", "teams"],
    Icon: UsersRound,
  },
  {
    title: "My Organizations",
    description: "Your joined activity space",
    to: "/activities/my",
    search: { tab: "projects" },
    keywords: [
      "my organizations",
      "joined organizations",
      "my projects",
      "joined",
    ],
    Icon: UsersRound,
  },
  {
    title: "Projects",
    description: "Browse available projects",
    to: "/activities",
    search: { tab: "projects" },
    keywords: ["projects", "project", "activities", "volunteer"],
    Icon: FolderKanban,
  },
  {
    title: "Events",
    description: "Browse upcoming events",
    to: "/activities",
    search: { tab: "events" },
    keywords: ["events", "event", "meetings", "activities"],
    Icon: CalendarDays,
  },
  {
    title: "Tasks",
    description: "Browse available tasks",
    to: "/activities",
    search: { tab: "tasks" },
    keywords: ["tasks", "task", "todo", "activities"],
    Icon: ListChecks,
  },
  {
    title: "My Activities",
    description: "Projects, events, and tasks you joined",
    to: "/activities/my",
    search: { tab: "projects" },
    keywords: ["my activities", "joined activities", "my tasks", "my events"],
    Icon: Sparkles,
  },
  {
    title: "Time Bank",
    description: "Track volunteer time, offers, and transactions",
    to: "/time-bank",
    keywords: [
      "time bank",
      "hours",
      "offers",
      "bookings",
      "transactions",
      "volunteer time",
    ],
    Icon: WalletCards,
  },
  {
    title: "Bookmarks",
    description: "Joined projects, events, and tasks",
    to: "/bookmarks",
    search: { tab: "projects" },
    keywords: ["bookmarks", "saved", "joined activities", "participating"],
    Icon: Bookmark,
  },
  {
    title: "Map",
    description: "Explore projects by location",
    to: "/map",
    keywords: ["map", "location", "nearby", "geo"],
    Icon: Map,
  },
  {
    title: "Categories",
    description: "Browse activity categories",
    to: "/categories",
    keywords: ["categories", "category", "topics", "causes"],
    Icon: Tags,
  },
  {
    title: "Calendar",
    description: "Availability and scheduled activities",
    to: "/calendar",
    keywords: ["calendar", "schedule", "availability", "dates"],
    Icon: CalendarDays,
  },
  {
    title: "Skills",
    description: "Browse skills and levels",
    to: "/skills",
    keywords: ["skills", "skill", "experience", "levels"],
    Icon: Shapes,
  },
];

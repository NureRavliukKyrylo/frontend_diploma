import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Bell,
  Bookmark,
  CalendarDays,
  CircleHelp,
  FileText,
  FolderKanban,
  Home,
  LayoutDashboard,
  ListChecks,
  Map,
  MessageCircle,
  PlusCircle,
  ShieldAlert,
  Settings,
  Shapes,
  Sparkles,
  Tags,
  UserRound,
  UsersRound,
  WalletCards,
} from "lucide-react";

export interface SearchablePageConfig {
  id: string;
  titleKey: string;
  descriptionKey: string;
  keywordsKey: string;
  to: string;
  search?: Record<string, unknown>;
  Icon: LucideIcon;
}

export interface SearchablePage {
  title: string;
  description: string;
  to: string;
  search?: Record<string, unknown>;
  keywords: string[];
  Icon: LucideIcon;
}

export const searchablePageConfigs: SearchablePageConfig[] = [
  {
    id: "home",
    titleKey: "header.searchPages.home.title",
    descriptionKey: "header.searchPages.home.description",
    keywordsKey: "header.searchPages.home.keywords",
    to: "/",
    Icon: Home,
  },
  {
    id: "profile",
    titleKey: "header.searchPages.profile.title",
    descriptionKey: "header.searchPages.profile.description",
    keywordsKey: "header.searchPages.profile.keywords",
    to: "/profile",
    search: { tab: "profile" },
    Icon: UserRound,
  },
  {
    id: "profileSettings",
    titleKey: "header.searchPages.profileSettings.title",
    descriptionKey: "header.searchPages.profileSettings.description",
    keywordsKey: "header.searchPages.profileSettings.keywords",
    to: "/profile/settings",
    search: { tab: "settings" },
    Icon: Settings,
  },
  {
    id: "chat",
    titleKey: "header.searchPages.chat.title",
    descriptionKey: "header.searchPages.chat.description",
    keywordsKey: "header.searchPages.chat.keywords",
    to: "/chat",
    Icon: MessageCircle,
  },
  {
    id: "notifications",
    titleKey: "header.searchPages.notifications.title",
    descriptionKey: "header.searchPages.notifications.description",
    keywordsKey: "header.searchPages.notifications.keywords",
    to: "/notifications",
    Icon: Bell,
  },
  {
    id: "organizations",
    titleKey: "header.searchPages.organizations.title",
    descriptionKey: "header.searchPages.organizations.description",
    keywordsKey: "header.searchPages.organizations.keywords",
    to: "/organizations",
    Icon: UsersRound,
  },
  {
    id: "myOrganizations",
    titleKey: "header.searchPages.myOrganizations.title",
    descriptionKey: "header.searchPages.myOrganizations.description",
    keywordsKey: "header.searchPages.myOrganizations.keywords",
    to: "/organizations/my",
    Icon: UsersRound,
  },
  {
    id: "createOrganization",
    titleKey: "header.searchPages.createOrganization.title",
    descriptionKey: "header.searchPages.createOrganization.description",
    keywordsKey: "header.searchPages.createOrganization.keywords",
    to: "/organizations/create",
    Icon: PlusCircle,
  },
  {
    id: "archivedOrganizations",
    titleKey: "header.searchPages.archivedOrganizations.title",
    descriptionKey: "header.searchPages.archivedOrganizations.description",
    keywordsKey: "header.searchPages.archivedOrganizations.keywords",
    to: "/organizations/archived",
    Icon: Archive,
  },
  {
    id: "categories",
    titleKey: "header.searchPages.categories.title",
    descriptionKey: "header.searchPages.categories.description",
    keywordsKey: "header.searchPages.categories.keywords",
    to: "/categories",
    Icon: Tags,
  },
  {
    id: "skills",
    titleKey: "header.searchPages.skills.title",
    descriptionKey: "header.searchPages.skills.description",
    keywordsKey: "header.searchPages.skills.keywords",
    to: "/skills",
    Icon: Shapes,
  },
  {
    id: "projects",
    titleKey: "header.searchPages.projects.title",
    descriptionKey: "header.searchPages.projects.description",
    keywordsKey: "header.searchPages.projects.keywords",
    to: "/activities",
    search: { tab: "projects" },
    Icon: FolderKanban,
  },
  {
    id: "events",
    titleKey: "header.searchPages.events.title",
    descriptionKey: "header.searchPages.events.description",
    keywordsKey: "header.searchPages.events.keywords",
    to: "/activities",
    search: { tab: "events" },
    Icon: CalendarDays,
  },
  {
    id: "tasks",
    titleKey: "header.searchPages.tasks.title",
    descriptionKey: "header.searchPages.tasks.description",
    keywordsKey: "header.searchPages.tasks.keywords",
    to: "/activities",
    search: { tab: "tasks" },
    Icon: ListChecks,
  },
  {
    id: "myActivities",
    titleKey: "header.searchPages.myActivities.title",
    descriptionKey: "header.searchPages.myActivities.description",
    keywordsKey: "header.searchPages.myActivities.keywords",
    to: "/activities/my",
    search: { tab: "projects" },
    Icon: Sparkles,
  },
  {
    id: "reports",
    titleKey: "header.searchPages.reports.title",
    descriptionKey: "header.searchPages.reports.description",
    keywordsKey: "header.searchPages.reports.keywords",
    to: "/reports",
    Icon: ShieldAlert,
  },
  {
    id: "timeBank",
    titleKey: "header.searchPages.timeBank.title",
    descriptionKey: "header.searchPages.timeBank.description",
    keywordsKey: "header.searchPages.timeBank.keywords",
    to: "/time-bank",
    Icon: WalletCards,
  },
  {
    id: "bookmarks",
    titleKey: "header.searchPages.bookmarks.title",
    descriptionKey: "header.searchPages.bookmarks.description",
    keywordsKey: "header.searchPages.bookmarks.keywords",
    to: "/bookmarks",
    search: { tab: "projects" },
    Icon: Bookmark,
  },
  {
    id: "map",
    titleKey: "header.searchPages.map.title",
    descriptionKey: "header.searchPages.map.description",
    keywordsKey: "header.searchPages.map.keywords",
    to: "/map",
    Icon: Map,
  },
  {
    id: "calendar",
    titleKey: "header.searchPages.calendar.title",
    descriptionKey: "header.searchPages.calendar.description",
    keywordsKey: "header.searchPages.calendar.keywords",
    to: "/calendar",
    Icon: CalendarDays,
  },
  {
    id: "faq",
    titleKey: "header.searchPages.faq.title",
    descriptionKey: "header.searchPages.faq.description",
    keywordsKey: "header.searchPages.faq.keywords",
    to: "/faq",
    Icon: CircleHelp,
  },
  {
    id: "privacy",
    titleKey: "header.searchPages.privacy.title",
    descriptionKey: "header.searchPages.privacy.description",
    keywordsKey: "header.searchPages.privacy.keywords",
    to: "/privacy",
    Icon: FileText,
  },
  {
    id: "terms",
    titleKey: "header.searchPages.terms.title",
    descriptionKey: "header.searchPages.terms.description",
    keywordsKey: "header.searchPages.terms.keywords",
    to: "/terms",
    Icon: FileText,
  },
  {
    id: "admin",
    titleKey: "header.searchPages.admin.title",
    descriptionKey: "header.searchPages.admin.description",
    keywordsKey: "header.searchPages.admin.keywords",
    to: "/admin",
    Icon: LayoutDashboard,
  },
];

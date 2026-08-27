import {
  CalendarPlus,
  CirclePlus,
  FolderPlus,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export type OrganizationFabActionId =
  | "dashboard"
  | "settings"
  | "members"
  | "new-project"
  | "new-event"
  | "new-task"
  | "roles";

export interface OrganizationFabActionConfig {
  id: OrganizationFabActionId;
  labelKey: string;
  icon: LucideIcon;
  permission: "visible" | "manage" | "roles";
  target:
    | "/organizations/$id"
    | "/organizations/$id/settings"
    | "/organizations/$id/members"
    | "/organizations/$id/projects/create"
    | "/organizations/$id/events/create"
    | "/organizations/$id/roles"
    | null;
}

export const organizationFabActionsConfig: OrganizationFabActionConfig[] = [
  {
    id: "dashboard",
    labelKey: "fab.actions.dashboard",
    icon: LayoutDashboard,
    permission: "visible",
    target: "/organizations/$id",
  },
  {
    id: "settings",
    labelKey: "fab.actions.settings",
    icon: Settings,
    permission: "manage",
    target: "/organizations/$id/settings",
  },
  {
    id: "members",
    labelKey: "fab.actions.members",
    icon: Users,
    permission: "manage",
    target: "/organizations/$id/members",
  },
  {
    id: "new-project",
    labelKey: "fab.actions.project",
    icon: FolderPlus,
    permission: "manage",
    target: "/organizations/$id/projects/create",
  },
  {
    id: "new-event",
    labelKey: "fab.actions.event",
    icon: CalendarPlus,
    permission: "manage",
    target: "/organizations/$id/events/create",
  },
  {
    id: "new-task",
    labelKey: "fab.actions.task",
    icon: CirclePlus,
    permission: "manage",
    target: null,
  },
  {
    id: "roles",
    labelKey: "fab.actions.roles",
    icon: Shield,
    permission: "roles",
    target: "/organizations/$id/roles",
  },
];

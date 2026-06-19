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
  label: string;
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
    label: "Dashboard",
    icon: LayoutDashboard,
    permission: "visible",
    target: "/organizations/$id",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    permission: "manage",
    target: "/organizations/$id/settings",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    permission: "manage",
    target: "/organizations/$id/members",
  },
  {
    id: "new-project",
    label: "New project",
    icon: FolderPlus,
    permission: "manage",
    target: "/organizations/$id/projects/create",
  },
  {
    id: "new-event",
    label: "New event",
    icon: CalendarPlus,
    permission: "manage",
    target: "/organizations/$id/events/create",
  },
  {
    id: "new-task",
    label: "New task",
    icon: CirclePlus,
    permission: "manage",
    target: null,
  },
  {
    id: "roles",
    label: "Roles",
    icon: Shield,
    permission: "roles",
    target: "/organizations/$id/roles",
  },
];

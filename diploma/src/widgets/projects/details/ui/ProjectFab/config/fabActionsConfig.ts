import {
  CalendarPlus,
  CirclePlus,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ProjectFabActionId =
  | "dashboard"
  | "settings"
  | "members"
  | "new-event"
  | "new-task"
  | "roles";

export type ProjectFabPermission =
  | "visible"
  | "content"
  | "members"
  | "roles";

export interface ProjectFabActionConfig {
  id: ProjectFabActionId;
  labelKey: string;
  icon: LucideIcon;
  permission: ProjectFabPermission;
  target:
    | "/projects/$id/settings"
    | "/projects/$id/members"
    | "/projects/$id/roles"
    | "/organizations/$id/events/create"
    | null;
}

export const projectFabActionsConfig: ProjectFabActionConfig[] = [
  {
    id: "dashboard",
    labelKey: "project:fab.dashboard",
    icon: LayoutDashboard,
    permission: "visible",
    target: null,
  },
  {
    id: "settings",
    labelKey: "project:fab.settings",
    icon: Settings,
    permission: "content",
    target: "/projects/$id/settings",
  },
  {
    id: "members",
    labelKey: "project:fab.members",
    icon: Users,
    permission: "members",
    target: "/projects/$id/members",
  },
  {
    id: "new-event",
    labelKey: "project:fab.newEvent",
    icon: CalendarPlus,
    permission: "content",
    target: "/organizations/$id/events/create",
  },
  {
    id: "new-task",
    labelKey: "project:fab.newTask",
    icon: CirclePlus,
    permission: "content",
    target: null,
  },
  {
    id: "roles",
    labelKey: "project:fab.roles",
    icon: Shield,
    permission: "roles",
    target: "/projects/$id/roles",
  },
];

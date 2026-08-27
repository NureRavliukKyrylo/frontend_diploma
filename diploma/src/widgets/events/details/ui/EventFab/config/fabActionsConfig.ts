import {
  ClipboardCheck,
  CirclePlus,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export type EventFabActionId =
  | "dashboard"
  | "settings"
  | "members"
  | "roles"
  | "new-task"
  | "attendance";

export type EventFabPermission =
  | "visible"
  | "content"
  | "members"
  | "roles"
  | "attendance";

export interface EventFabActionConfig {
  id: EventFabActionId;
  labelKey: string;
  icon: LucideIcon;
  permission: EventFabPermission;
  target:
    | "/events/$id/settings"
    | "/events/$id/members"
    | "/events/$id/roles"
    | "/events/$id/attendance"
    | null;
}

export const eventFabActionsConfig: EventFabActionConfig[] = [
  {
    id: "dashboard",
    labelKey: "event:fab.dashboard",
    icon: LayoutDashboard,
    permission: "visible",
    target: null,
  },
  {
    id: "settings",
    labelKey: "event:fab.settings",
    icon: Settings,
    permission: "content",
    target: "/events/$id/settings",
  },
  {
    id: "members",
    labelKey: "event:fab.members",
    icon: Users,
    permission: "members",
    target: "/events/$id/members",
  },
  {
    id: "roles",
    labelKey: "event:fab.roles",
    icon: Shield,
    permission: "roles",
    target: "/events/$id/roles",
  },
  {
    id: "new-task",
    labelKey: "event:fab.newTask",
    icon: CirclePlus,
    permission: "content",
    target: null,
  },
  {
    id: "attendance",
    labelKey: "event:fab.attendance",
    icon: ClipboardCheck,
    permission: "attendance",
    target: "/events/$id/attendance",
  },
];

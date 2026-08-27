import {
  Clock,
  Settings,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

export type TaskFabActionId = "members" | "roles" | "timelog" | "settings";

export type TaskFabPermission = "members" | "roles" | "timelog" | "content";

export interface TaskFabActionConfig {
  id: TaskFabActionId;
  labelKey: string;
  icon: LucideIcon;
  permission: TaskFabPermission;
}

export const taskFabActionsConfig: TaskFabActionConfig[] = [
  {
    id: "members",
    labelKey: "task:fab.members",
    icon: Users,
    permission: "members",
  },
  {
    id: "roles",
    labelKey: "task:fab.roles",
    icon: Shield,
    permission: "roles",
  },
  {
    id: "timelog",
    labelKey: "task:fab.timelog",
    icon: Clock,
    permission: "timelog",
  },
  {
    id: "settings",
    labelKey: "task:fab.settings",
    icon: Settings,
    permission: "content",
  },
];

import { Clock, Shield, Users, type LucideIcon } from "lucide-react";

export type TaskFabActionId = "members" | "roles" | "timelog";

export type TaskFabPermission = "members" | "roles" | "timelog";

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
];

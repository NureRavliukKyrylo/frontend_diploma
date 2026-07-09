import { useMemo, useState } from "react";
import type { Task, TaskMode } from "@entities/task";
import { useTranslation } from "react-i18next";
import {
  canManageTask,
  canManageTaskMembers,
  canManageTaskRoles,
  canViewTaskTimeLogs,
  type TaskPermissionContext,
} from "../../../lib/canManageTask";
import {
  taskFabActionsConfig,
  type TaskFabActionConfig,
} from "../config/fabActionsConfig";

interface Params {
  task: Task;
  activeMode: TaskMode;
  onModeChange: (mode: TaskMode) => void;
  permissionContext?: TaskPermissionContext;
  onOpenSettings?: () => void;
}

export interface TaskFabAction extends TaskFabActionConfig {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const useTaskFabActions = ({
  task,
  activeMode,
  onModeChange,
  permissionContext,
  onOpenSettings,
}: Params) => {
  const { t } = useTranslation(["task"]);
  const [isOpen, setIsOpen] = useState(false);
  const canContent = canManageTask(task, permissionContext);
  const canMembers = canManageTaskMembers(task, permissionContext);
  const canRoles = canManageTaskRoles(task, permissionContext);
  const canTimelog = canViewTaskTimeLogs(task, permissionContext);
  const closeMenu = () => setIsOpen(false);

  const actions = useMemo<TaskFabAction[]>(
    () =>
      taskFabActionsConfig
        .filter(
          (action) =>
            (action.permission === "members" && canMembers) ||
            (action.permission === "roles" && canRoles) ||
            (action.permission === "timelog" && canTimelog) ||
            (action.permission === "content" && canContent),
        )
        .map((action) => ({
          ...action,
          label: t(action.labelKey),
          isActive: action.id !== "settings" && activeMode === action.id,
          onClick: () => {
            closeMenu();
            if (action.id === "settings") {
              onOpenSettings?.();
              return;
            }
            onModeChange(action.id);
          },
        }))
        .reverse(),
    [
      activeMode,
      canContent,
      canMembers,
      canRoles,
      canTimelog,
      onModeChange,
      onOpenSettings,
      t,
    ],
  );

  return {
    actions,
    isOpen,
    setIsOpen,
    closeMenu,
    isVisible: actions.length > 0,
    activeActionId: actions.find((action) => action.isActive)?.id,
  };
};

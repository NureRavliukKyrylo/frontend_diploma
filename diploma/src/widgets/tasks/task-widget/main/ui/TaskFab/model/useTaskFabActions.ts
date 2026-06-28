import { useMemo, useState } from "react";
import type { Task, TaskMode } from "@entities/task";
import { useTranslation } from "react-i18next";
import {
  canManageTaskMembers,
  canManageTaskRoles,
  canViewTaskTimeLogs,
} from "../../../lib/canManageTask";
import {
  taskFabActionsConfig,
  type TaskFabActionConfig,
} from "../config/fabActionsConfig";

interface Params {
  task: Task;
  activeMode: TaskMode;
  onModeChange: (mode: TaskMode) => void;
}

export interface TaskFabAction extends TaskFabActionConfig {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const useTaskFabActions = ({ task, activeMode, onModeChange }: Params) => {
  const { t } = useTranslation(["task"]);
  const [isOpen, setIsOpen] = useState(false);
  const canMembers = canManageTaskMembers(task);
  const canRoles = canManageTaskRoles(task);
  const canTimelog = canViewTaskTimeLogs(task);
  const closeMenu = () => setIsOpen(false);

  const actions = useMemo<TaskFabAction[]>(
    () =>
      taskFabActionsConfig
        .filter(
          (action) =>
            (action.permission === "members" && canMembers) ||
            (action.permission === "roles" && canRoles) ||
            (action.permission === "timelog" && canTimelog),
        )
        .map((action) => ({
          ...action,
          label: t(action.labelKey),
          isActive: activeMode === action.id,
          onClick: () => {
            closeMenu();
            onModeChange(action.id);
          },
        }))
        .reverse(),
    [activeMode, canMembers, canRoles, canTimelog, onModeChange, t],
  );

  return {
    actions,
    isOpen,
    setIsOpen,
    closeMenu,
    isVisible: actions.length > 0,
  };
};

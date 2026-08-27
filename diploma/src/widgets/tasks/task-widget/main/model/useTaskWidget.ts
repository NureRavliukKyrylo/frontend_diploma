import { useQuery } from "@tanstack/react-query";
import { useMapUserLocation } from "@features/map";
import {
  getTaskStatusConfig,
  taskQuery,
  type TaskDrawerSearch,
} from "@entities/task";
import { getTaskMainForms } from "../config/taskMainForms";
import { getPolicyStatusConfig } from "@shared/libs/entity";
import type { FeedbackSortValues } from "@entities/feedback";
import { getFullName } from "@entities/user";
import { useTranslation } from "react-i18next";
import { useTaskPermissionContext } from "./useTaskPermissionContext";

interface UseTaskWidgetProps {
  taskId?: string;
  search: TaskDrawerSearch;
  handleSort: (value: FeedbackSortValues) => void;
}

export const useTaskWidget = ({
  taskId,
  search,
  handleSort,
}: UseTaskWidgetProps) => {
  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...taskQuery.id(taskId!),
    enabled: !!taskId,
  });
  const { t } = useTranslation(["common", "task"]);
  const { user, coordinates: userLocation } = useMapUserLocation();
  const permissionContext = useTaskPermissionContext(task);

  const statusConfig = task ? getTaskStatusConfig(task.status, t) : null;
  const policyConfig = task?.joinPolicy
    ? getPolicyStatusConfig(task.joinPolicy, t)
    : null;

  const forms = task
    ? getTaskMainForms({
        task,
        userLocation,
        userId: user?.id,
        avatarUrl: user?.profile?.avatarUrl,
        userName: getFullName(user?.firstName, user?.lastName),
        search,
        handleSort,
        t,
        permissionContext,
      })
    : null;

  return {
    task,
    isLoading,
    isError,
    error,
    statusConfig,
    policyConfig,
    forms,
    permissionContext,
  };
};

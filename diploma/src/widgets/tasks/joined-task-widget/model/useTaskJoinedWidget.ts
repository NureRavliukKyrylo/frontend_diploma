import { useQuery } from "@tanstack/react-query";
import {
  getTaskStatusConfig,
  taskQuery,
  type TaskDrawerJoinedSearch,
} from "@entities/task";
import { getTaskJoinedMainForms } from "../config/taskJoinedMainForms";
import { profileQuery } from "@entities/user/profile";
import { useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

interface UseTaskJoinedWidgetProps {
  taskId?: string;
  search: TaskDrawerJoinedSearch;
}

export const useTaskJoinedWidget = ({
  taskId,
  search,
}: UseTaskJoinedWidgetProps) => {
  const { t } = useTranslation("task");
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const {
    data: task,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...taskQuery.joinedId(taskId!),
    enabled: !!taskId,
  });

  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: isAuthenticated,
  });

  const statusConfig = task ? getTaskStatusConfig(task.status, t) : null;

  const forms = task
    ? getTaskJoinedMainForms({
        task,
        user,
        search,
      })
    : null;

  return {
    task,
    isLoading,
    isError,
    error,
    statusConfig,
    forms,
  };
};

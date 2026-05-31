import { useQuery } from "@tanstack/react-query";
import { taskQuery, type TaskDrawerJoinedSearch } from "@entities/task";
import { getEntityStatusConfig } from "@shared/libs/entity";
import { getTaskJoinedMainForms } from "../config/taskJoinedMainForms";
import { profileQuery } from "@entities/user/profile";
import { useUserStore } from "@entities/user";
import { DefaultAvatar } from "@shared/assets/images/user";

interface UseTaskJoinedWidgetProps {
  taskId?: string;
  search: TaskDrawerJoinedSearch;
}

export const useTaskJoinedWidget = ({
  taskId,
  search,
}: UseTaskJoinedWidgetProps) => {
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

  const statusConfig = task ? getEntityStatusConfig(task.status) : null;

  const forms = task
    ? getTaskJoinedMainForms({
        task,
        userAvatar: user?.profile?.avatarUrl ?? DefaultAvatar,
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

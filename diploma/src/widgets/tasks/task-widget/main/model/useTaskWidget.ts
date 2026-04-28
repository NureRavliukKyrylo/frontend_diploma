import { useQuery } from "@tanstack/react-query";
import { useMapUserLocation } from "@features/map";
import { taskQuery, type TaskDrawerSearch } from "@entities/task";
import { getTaskMainForms } from "../config/taskMainForms";
import {
  getEntityStatusConfig,
  getPolicyStatusConfig,
} from "@shared/libs/entity";
import type { FeedbackSortValues } from "@entities/feedback";

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

  const { user, coordinates: userLocation } = useMapUserLocation();

  const statusConfig = task ? getEntityStatusConfig(task.status) : null;
  const policyConfig = task?.joinPolicy
    ? getPolicyStatusConfig(task.joinPolicy)
    : null;

  const forms = task
    ? getTaskMainForms({
        task,
        userLocation,
        userId: user?.id,
        search,
        handleSort,
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
  };
};

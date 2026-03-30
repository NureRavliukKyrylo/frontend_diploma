import type { QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./TasksListWidget.module.scss";
import type { Task } from "@entities/task";

interface TasksListWidgetProps {
  query?: QueryResult<Task>;
  tasks?: Task[];
  renderCard: (task: Task, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const TasksListWidget = ({
  query,
  tasks: readyTasks,
  renderCard,
  renderSkeleton,
  skeletonItems,
  startSlot,
  className,
}: TasksListWidgetProps) => {
  const tasks = readyTasks ?? query?.data ?? [];
  const isLoading = query?.isLoading ?? false;

  if (isLoading && renderSkeleton) {
    return (
      <ListWidgetSkeleton
        renderSkeleton={renderSkeleton}
        items={skeletonItems}
        className={className}
      />
    );
  }

  return (
    <div className={`${styles.feedbackListWrapper} ${className ?? ""}`.trim()}>
      {startSlot}
      {tasks.map((task, index) => renderCard(task, index))}
    </div>
  );
};

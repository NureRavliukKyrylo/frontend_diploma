import type { PaginationRender, QueryResult } from "@shared/config/types";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import styles from "./TasksListWidget.module.scss";
import type { Task } from "@entities/task";

interface TasksListWidgetProps {
  useTasksQuery?: () => QueryResult<Task>;
  tasks?: Task[];
  renderCard: (task: Task, index: number) => React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  renderPagination?: (props: PaginationRender) => React.ReactNode;
  renderEmpty?: (tasks: Task[]) => React.ReactNode;
  skeletonItems?: number;
  startSlot?: React.ReactNode;
  className?: string;
}

export const TasksListWidget = ({
  useTasksQuery,
  tasks: readyTasks,
  renderCard,
  renderSkeleton,
  renderEmpty,
  renderPagination,
  skeletonItems,
  startSlot,
  className,
}: TasksListWidgetProps) => {
  const queryResult = useTasksQuery?.();
  const tasks = readyTasks ?? queryResult?.data ?? [];
  const isLoading = queryResult?.isLoading ?? false;
  const hasNextPage = queryResult?.hasNextPage ?? false;
  const isFetchingNextPage = queryResult?.isFetchingNextPage ?? false;
  const fetchNextPage = queryResult?.fetchNextPage ?? (() => {});

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
    <>
      {renderEmpty?.(tasks) ?? (
        <>
          <div
            className={[styles.tasksListWrapper, className]
              .filter(Boolean)
              .join(" ")}
          >
            {startSlot}
            {tasks.map((task, index) => renderCard(task, index))}
          </div>
          {renderPagination?.({
            fetchNextPage,
            isFetchingNextPage,
            hasNextPage,
          })}
        </>
      )}
    </>
  );
};

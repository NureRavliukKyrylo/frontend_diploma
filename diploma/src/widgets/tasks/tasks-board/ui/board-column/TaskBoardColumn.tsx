import styles from "./TaskBoardColumn.module.scss";
import { TasksListWidget } from "@widgets/tasks";
import { useTasksListQuery } from "@entities/task";
import type { TaskStatus } from "@entities/task";
import { Suspense } from "react";
import { useTaskBoardContext } from "../../model/TaskBoardContext";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { LoadMoreButton } from "@shared/ui/buttons";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";

interface TaskBoardColumnProps {
  status: TaskStatus;
  title: string;
  icon: string;
}

export const TaskBoardColumn = ({
  status,
  title,
  icon,
}: TaskBoardColumnProps) => {
  const { renderCard, renderSkeleton, onAddTask, filters } =
    useTaskBoardContext();

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <div className={styles.columnTitle}>
          <img src={icon} className={styles.statusIcon} />
          <span className={styles.statusTitle}>{title}</span>
        </div>
        {onAddTask && (
          <button
            className={styles.addTaskButton}
            onClick={() => onAddTask(status)}
          />
        )}
      </div>
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className={styles.errorState}>
              <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
              <p className="errorHint">
                Try reloading the page or come back later.
              </p>
            </div>
          );
        }}
      >
        <Suspense
          fallback={
            renderSkeleton ? (
              <ListWidgetSkeleton
                items={4}
                renderSkeleton={renderSkeleton}
                className={styles.columnCards}
              />
            ) : null
          }
        >
          <TasksListWidget
            useTasksQuery={useTasksListQuery({ ...filters, Status: status })}
            renderCard={renderCard}
            className={styles.columnCards}
            renderPagination={({
              fetchNextPage,
              isFetchingNextPage,
              hasNextPage,
            }) =>
              hasNextPage && (
                <LoadMoreButton
                  onClick={fetchNextPage}
                  isLoading={isFetchingNextPage}
                  className={styles.loadMoreTasks}
                />
              )
            }
            renderEmpty={(tasks) =>
              tasks.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>No tasks yet</h2>
                </div>
              ) : null
            }
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

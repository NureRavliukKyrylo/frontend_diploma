import styles from "./TaskBoardColumn.module.scss";
import { TasksListWidget } from "@widgets/tasks";
import type { Task, TaskStatus } from "@entities/task";
import type { DragEvent } from "react";
import { Suspense } from "react";
import { useTaskBoardContext } from "../../model/TaskBoardContext";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { LoadMoreButton } from "@shared/ui/buttons";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import type { QueryResult } from "@shared/config/types";
import { useTranslation } from "react-i18next";

interface TaskBoardColumnProps {
  status: TaskStatus;
  title: string;
  icon: string;
  useTasksQuery?: () => QueryResult<Task>;
}

export const TaskBoardColumn = ({
  status,
  title,
  icon,
}: TaskBoardColumnProps) => {
  const {
    renderCard,
    renderSkeleton,
    onAddTask,
    useTasksQuery,
    canMoveTasks,
    draggedTask,
    dropTargetStatus,
    isMovingTask,
    onMoveTask,
    startDraggingTask,
    finishDraggingTask,
    setDropTargetStatus,
  } = useTaskBoardContext();
  const { t } = useTranslation(["task", "common"]);
  const canDropHere = Boolean(
    canMoveTasks &&
      draggedTask &&
      draggedTask.status !== status &&
      !isMovingTask,
  );
  const isDropTarget = dropTargetStatus === status && canDropHere;

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (!canDropHere) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDropTargetStatus?.(status);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
    setDropTargetStatus?.(null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const task = draggedTask;
    finishDraggingTask?.();

    if (!canMoveTasks || !task || task.status === status || isMovingTask) return;
    void onMoveTask?.(task, status);
  };

  const renderBoardCard = (task: Task, index: number) => {
    const card = renderCard(task, index);
    const isDragging = draggedTask?.id === task.id;

    if (!canMoveTasks) return card;

    return (
      <div
        key={task.id}
        className={styles.draggableCard}
        draggable={!isMovingTask}
        data-dragging={isDragging ? "true" : undefined}
        onDragStart={(event) => {
          if (isMovingTask) return;
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", task.id);
          startDraggingTask?.(task);
        }}
        onDragEnd={() => finishDraggingTask?.()}
      >
        {card}
      </div>
    );
  };

  return (
    <div
      className={styles.column}
      data-drop-active={isDropTarget ? "true" : undefined}
      data-can-drop={canDropHere ? "true" : undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        <div className={styles.columnHeader}>
          <div className={styles.columnTitle}>
          <img src={icon} className={styles.statusIcon} alt="" />
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
              <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
              <p className="errorHint">{t("common:errors.errorHint")}</p>
            </div>
          );
        }}
      >
        <Suspense
          fallback={
            renderSkeleton ? (
              <ListWidgetSkeleton
                items={2}
                renderSkeleton={renderSkeleton}
                className={styles.columnCards}
              />
            ) : null
          }
        >
          <TasksListWidget
            useTasksQuery={useTasksQuery(status)}
            renderCard={renderBoardCard}
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
                  <h2>{t("task:board.empty", "No tasks yet")}</h2>
                </div>
              ) : null
            }
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

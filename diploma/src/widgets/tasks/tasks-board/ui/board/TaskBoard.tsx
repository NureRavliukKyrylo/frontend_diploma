import styles from "./TaskBoard.module.scss";
import { boardColumns } from "../../config/boardColumns";
import type { Task, TaskStatus } from "@entities/task";
import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";
import { TaskBoardColumn } from "../board-column/TaskBoardColumn";
import { TaskBoardProvider } from "../../model/TaskBoardContext";
import type { QueryResult } from "@shared/config/types";

interface TaskBoardProps {
  renderCard: (task: Task, index: number) => ReactNode;
  onAddTask?: (status: TaskStatus) => void;
  onMoveTask?: (task: Task, status: TaskStatus) => void | Promise<void>;
  canMoveTasks?: boolean;
  isMovingTask?: boolean;
  renderSkeleton?: () => React.ReactNode;
  useTasksQuery: (status: TaskStatus) => () => QueryResult<Task>;
}

export const TaskBoard = ({
  renderCard,
  onAddTask,
  onMoveTask,
  canMoveTasks = false,
  isMovingTask = false,
  renderSkeleton,
  useTasksQuery,
}: TaskBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dropTargetStatus, setDropTargetStatus] = useState<TaskStatus | null>(
    null,
  );

  const finishDraggingTask = useCallback(() => {
    setDraggedTask(null);
    setDropTargetStatus(null);
  }, []);

  const value = useMemo(
    () => ({
      renderCard,
      onAddTask,
      onMoveTask,
      canMoveTasks,
      draggedTask,
      dropTargetStatus,
      isMovingTask,
      renderSkeleton,
      useTasksQuery,
      startDraggingTask: setDraggedTask,
      finishDraggingTask,
      setDropTargetStatus,
    }),
    [
      canMoveTasks,
      draggedTask,
      dropTargetStatus,
      isMovingTask,
      onAddTask,
      onMoveTask,
      renderCard,
      renderSkeleton,
      finishDraggingTask,
      useTasksQuery,
    ],
  );

  return (
    <TaskBoardProvider value={value}>
      <div className={styles.taskBoard}>
        {boardColumns.map((column) => (
          <TaskBoardColumn key={column.status} {...column} />
        ))}
      </div>
    </TaskBoardProvider>
  );
};

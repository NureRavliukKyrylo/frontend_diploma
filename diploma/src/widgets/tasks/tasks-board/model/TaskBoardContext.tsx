import { createContext, useContext } from "react";
import type { Task, TaskStatus } from "@entities/task";
import type { ReactNode } from "react";
import type { QueryResult } from "@shared/config/types";

interface TaskBoardContextValue {
  renderCard: (task: Task, index: number) => ReactNode;
  renderSkeleton?: () => ReactNode;
  onAddTask?: (status: TaskStatus) => void;
  useTasksQuery: (status: TaskStatus) => () => QueryResult<Task>;
  canMoveTasks?: boolean;
  draggedTask?: Task | null;
  dropTargetStatus?: TaskStatus | null;
  isMovingTask?: boolean;
  onMoveTask?: (task: Task, status: TaskStatus) => void | Promise<void>;
  startDraggingTask?: (task: Task) => void;
  finishDraggingTask?: () => void;
  setDropTargetStatus?: (status: TaskStatus | null) => void;
}

const TaskBoardContext = createContext<TaskBoardContextValue | null>(null);

export const useTaskBoardContext = () => {
  const ctx = useContext(TaskBoardContext);
  if (!ctx)
    throw new Error("useTaskBoardContext must be used within TaskBoard");
  return ctx;
};

export const TaskBoardProvider = TaskBoardContext.Provider;

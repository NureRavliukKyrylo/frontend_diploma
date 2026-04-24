import { createContext, useContext } from "react";
import type { Task, TaskStatus, TasksRequestParams } from "@entities/task";
import type { ReactNode } from "react";

interface TaskBoardContextValue {
  renderCard: (task: Task, index: number) => ReactNode;
  renderSkeleton?: () => ReactNode;
  onAddTask?: (status: TaskStatus) => void;
  filters?: Omit<TasksRequestParams, "Status">;
}

const TaskBoardContext = createContext<TaskBoardContextValue | null>(null);

export const useTaskBoardContext = () => {
  const ctx = useContext(TaskBoardContext);
  if (!ctx)
    throw new Error("useTaskBoardContext must be used within TaskBoard");
  return ctx;
};

export const TaskBoardProvider = TaskBoardContext.Provider;

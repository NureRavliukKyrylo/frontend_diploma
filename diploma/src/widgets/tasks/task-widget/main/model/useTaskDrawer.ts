import { type TaskMode } from "@entities/task";

export type TaskDrawerSearch = {
  taskId?: string;
  taskMode?: "overview" | "members" | "feedbacks";
  DrawerPageSize?: number;
  DrawerOrderBy?: "default" | "date" | "asc" | "desc";
};

type NavFn = (updater: (prev: TaskDrawerSearch) => TaskDrawerSearch) => void;

export const useTaskDrawer = (search: TaskDrawerSearch, nav: NavFn) => {
  const openTask = (taskId: string, taskMode: TaskMode = "overview") => {
    nav((prev) => ({ ...prev, taskId, taskMode }));
  };

  const closeTask = () =>
    nav((prev) => ({
      ...prev,
      taskId: undefined,
      taskMode: undefined,
      DrawerPageSize: undefined,
      DrawerOrderBy: undefined,
    }));

  const handleModeChange = (taskMode: TaskMode) => {
    nav((prev) => ({
      ...prev,
      taskMode,
      DrawerPageSize: undefined,
      DrawerOrderBy: undefined,
    }));
  };

  return {
    taskId: search.taskId,
    taskMode: search.taskMode ?? "overview",
    isOpen: !!search.taskId,
    openTask,
    closeTask,
    handleModeChange,
  };
};

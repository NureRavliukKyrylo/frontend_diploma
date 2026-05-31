import {
  type TaskDrawerJoinedSearch,
  type TaskJoinedMode,
} from "@entities/task";

type NavFn = (
  updater: (prev: TaskDrawerJoinedSearch) => TaskDrawerJoinedSearch,
) => void;

export const useTaskJoinedDrawer = (
  search: TaskDrawerJoinedSearch,
  nav: NavFn,
) => {
  const openTask = (taskId: string, taskMode: TaskJoinedMode = "comments") => {
    nav((prev) => ({ ...prev, taskId, taskMode }));
  };

  const closeTask = () =>
    nav((prev) => ({
      ...prev,
      taskId: undefined,
      taskMode: undefined,
    }));

  const handleModeChange = (taskMode: TaskJoinedMode) => {
    nav((prev) => ({
      ...prev,
      taskMode,
    }));
  };

  return {
    taskId: search.taskId,
    taskMode: search.taskMode ?? "comments",
    isOpen: !!search.taskId,
    openTask,
    closeTask,
    handleModeChange,
  };
};

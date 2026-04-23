import type { TaskMode, TaskSearchParams } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const useTaskDrawer = () => {
  const search = useSearch({
    from: "/_masterLayout/activities/",
  }) as TaskSearchParams;
  const navigate = useNavigate({ from: "/activities/" });

  const nav = (updater: (prev: TaskSearchParams) => TaskSearchParams) =>
    navigate({
      search: (prev) => updater(prev as TaskSearchParams),
      resetScroll: false,
    });

  const openTask = (taskId: string, taskMode: TaskMode = "overview") =>
    nav((prev) => ({ ...prev, taskId, taskMode }));

  const closeTask = () =>
    nav((prev) => ({ ...prev, taskId: undefined, taskMode: undefined }));

  const handleModeChange = (taskMode: TaskMode) =>
    nav((prev) => ({ ...prev, taskMode }));

  return {
    taskId: search.taskId,
    taskMode: search.taskMode ?? "overview",
    isOpen: !!search.taskId,
    openTask,
    closeTask,
    handleModeChange,
  };
};

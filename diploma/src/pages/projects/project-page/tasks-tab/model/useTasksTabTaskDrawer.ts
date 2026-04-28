import type { TaskDrawerSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskDrawer } from "@widgets/tasks";

export const useTasksTabProject = () => {
  const search = useSearch({ from: "/_masterLayout/projects/$id/" });
  const navigate = useNavigate({ from: "/projects/$id/" });

  return useTaskDrawer(search as TaskDrawerSearch, (updater) => {
    navigate({
      search: (prev) =>
        ({
          ...prev,
          ...updater(prev as unknown as TaskDrawerSearch),
        }) as typeof prev,
      resetScroll: false,
    });
  });
};

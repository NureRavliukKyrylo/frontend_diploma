import type { TaskDrawerSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskDrawer } from "@widgets/tasks";

export const useTasksTabEvent = () => {
  const search = useSearch({ from: "/_publicLayout/events/$id/" });
  const navigate = useNavigate({ from: "/events/$id/" });

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

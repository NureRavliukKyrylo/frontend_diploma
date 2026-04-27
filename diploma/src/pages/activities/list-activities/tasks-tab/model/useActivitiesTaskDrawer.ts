import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskDrawer } from "@widgets/tasks";
import type { TaskDrawerSearch } from "@widgets/tasks/task-widget/main/model/useTaskDrawer";

export const useActivitiesTaskDrawer = () => {
  const search = useSearch({ from: "/_masterLayout/activities/" });
  const navigate = useNavigate({ from: "/activities/" });

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

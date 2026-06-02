import type { TaskDrawerJoinedSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskJoinedDrawer } from "@widgets/tasks";

export const useMyActivitiesTaskDrawer = () => {
  const search = useSearch({ from: "/_masterLayout/activities/my/" });
  const navigate = useNavigate({ from: "/activities/my/" });

  return useTaskJoinedDrawer(search as TaskDrawerJoinedSearch, (updater) => {
    navigate({
      search: (prev) =>
        ({
          ...prev,
          ...updater(prev as unknown as TaskDrawerJoinedSearch),
        }) as typeof prev,
      resetScroll: false,
    });
  });
};

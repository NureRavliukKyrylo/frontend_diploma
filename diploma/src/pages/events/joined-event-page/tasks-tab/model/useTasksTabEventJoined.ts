import type { TaskDrawerJoinedSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskJoinedDrawer } from "@widgets/tasks";

export const useTasksTabEventJoined = () => {
  const search = useSearch({ from: "/_masterLayout/events/my/$id/" });
  const navigate = useNavigate({ from: "/events/my/$id/" });

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

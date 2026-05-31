import type { TaskDrawerJoinedSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskJoinedDrawer } from "@widgets/tasks";

export const useTasksTabProjectJoined = () => {
  const search = useSearch({ from: "/_masterLayout/projects/my/$id/" });
  const navigate = useNavigate({ from: "/projects/my/$id/" });

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

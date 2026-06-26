import type { TaskDrawerSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskDrawer } from "@widgets/tasks";

export const useCategoryDetailTaskDrawer = () => {
  const search = useSearch({ from: "/_publicLayout/categories/$id/" });
  const navigate = useNavigate({ from: "/categories/$id/" });

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

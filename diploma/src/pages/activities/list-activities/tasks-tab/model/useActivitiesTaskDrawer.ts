import type { TaskDrawerSearch } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTaskDrawer } from "@widgets/tasks";
import type { BaseFiltersRoute } from "@shared/config/types";

type ActivitiesSearchRoute =
  | "/_masterLayout/activities/"
  | "/_masterLayout/bookmarks/";

export const useActivitiesTaskDrawer = (
  routeFrom: ActivitiesSearchRoute = "/_masterLayout/activities/",
  navigateFrom: BaseFiltersRoute = "/activities/",
  joinedOnly = false,
) => {
  const search = useSearch({ from: routeFrom as any });
  const navigate = useNavigate({ from: navigateFrom });

  return useTaskDrawer(search as TaskDrawerSearch, (updater) => {
    navigate({
      search: (prev) =>
        ({
          ...prev,
          ...updater(prev as unknown as TaskDrawerSearch),
          ...(joinedOnly ? { ShowJoined: true } : {}),
        }) as typeof prev,
      resetScroll: false,
    });
  });
};

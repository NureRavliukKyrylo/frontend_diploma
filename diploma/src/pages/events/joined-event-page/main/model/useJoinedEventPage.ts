import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  eventJoinedDefaults,
  eventQuery,
  type EventJoinedMode,
} from "@entities/event";
import { useMapUserLocation } from "@features/map";
import type { TaskDrawerSearch } from "@entities/task";
import { getJoinedEventMainForms } from "../config/eventJoinedMainForms";

export const useJoinedEventPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/my/$id/" });
  const { tab, ...search } = useSearch({
    from: "/_masterLayout/events/my/$id/",
  });

  const { data: event } = useSuspenseQuery(eventQuery.id(id));
  const { coordinates: userLocation } = useMapUserLocation();

  const navigate = useNavigate({ from: "/events/my/$id/" });

  const handleTabChange = (tab: EventJoinedMode) => {
    navigate({
      params: { id },
      search: eventJoinedDefaults[tab],
      resetScroll: false,
    });
  };

  const { taskId, taskMode, DrawerPageSize, DrawerOrderBy, ...taskFilters } =
    search as TaskDrawerSearch;

  const filters = { ...taskFilters, EventIds: [id] };

  const forms = getJoinedEventMainForms({
    event,
    userLocation,
    search,
    filters,
  });

  return {
    tab,
    event,
    forms,
    handleTabChange,
  };
};

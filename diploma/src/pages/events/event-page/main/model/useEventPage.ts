import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  eventDetailDefaults,
  eventQuery,
  type EventMode,
} from "@entities/event";
import { useMapUserLocation } from "@features/map";
import { getPolicyStatusConfig } from "@shared/libs/entity";
import { getEventMainForms } from "../config/eventMainForms";
import type { FeedbackSortValues } from "@entities/feedback";
import type { TaskDrawerSearch } from "@entities/task";

export const useEventPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/$id/" });
  const { tab, ...search } = useSearch({ from: "/_masterLayout/events/$id/" });

  const { data: event } = useSuspenseQuery(eventQuery.id(id));
  const { user, coordinates: userLocation } = useMapUserLocation();

  const navigate = useNavigate({ from: "/events/$id/" });

  const handleTabChange = (tab: EventMode) => {
    navigate({
      params: { id },
      search: eventDetailDefaults[tab],
      resetScroll: false,
    });
  };

  const handleSort = (value: FeedbackSortValues) => {
    navigate({
      params: { id },
      search: (prev) => ({ ...prev, OrderBy: value }),
      resetScroll: false,
    });
  };

  const policyConfig = event?.joinPolicy
    ? getPolicyStatusConfig(event.joinPolicy)
    : null;

  const { taskId, taskMode, DrawerPageSize, DrawerOrderBy, ...taskFilters } =
    search as TaskDrawerSearch;

  const filters = { ...taskFilters, EventIds: [id] };

  const forms = getEventMainForms({
    event,
    userLocation,
    userId: user?.id,
    search,
    handleSort,
    filters,
  });

  return {
    tab,
    event,
    policyConfig,
    forms,
    handleTabChange,
  };
};

import {
  eventQuery,
  type EventSearchParams,
  type EventSortValues,
} from "@entities/event";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type { BaseFiltersRoute } from "@shared/config/types";

export const useEventsTab = (
  search: EventSearchParams,
  from: BaseFiltersRoute = "/activities/",
  joinedOnly = false,
) => {
  const navigate = useNavigate({ from });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: events } = useQuery(eventQuery.list(search));
  const router = useRouter();

  const withJoinedOnly = (params: EventSearchParams) =>
    joinedOnly ? { ...params, ShowJoined: true } : params;

  const nav = (updater: (prev: EventSearchParams) => EventSearchParams) =>
    navigate({
      search: (prev) => withJoinedOnly(updater(prev as EventSearchParams)),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: EventSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    navigate({
      search: (prev) =>
        withJoinedOnly({ ...(prev as EventSearchParams), Page: page }),
    });

  return {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events,
    router,
  };
};

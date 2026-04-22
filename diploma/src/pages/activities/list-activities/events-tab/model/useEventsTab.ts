import {
  eventQuery,
  type EventSearchParams,
  type EventSortValues,
} from "@entities/event";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useEventsTab = (search: EventSearchParams) => {
  const navigate = useNavigate({ from: "/activities/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: events } = useQuery(eventQuery.list(search));
  const router = useRouter();

  const nav = (updater: (prev: EventSearchParams) => EventSearchParams) =>
    navigate({
      search: (prev) => updater(prev as EventSearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: EventSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    nav((prev) => ({ ...prev, Page: page }));

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

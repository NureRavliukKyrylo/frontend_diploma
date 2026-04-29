import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  eventQuery,
  type Event,
  type EventSortValues,
  type MyEventsSearchParams,
} from "@entities/event";

export const useEventsTab = (search: MyEventsSearchParams) => {
  const navigate = useNavigate({ from: "/activities/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Pick<
    Event,
    "id" | "title"
  > | null>(null);

  const { data } = useQuery(eventQuery.my(search));

  const nav = (updater: (prev: MyEventsSearchParams) => MyEventsSearchParams) =>
    navigate({
      search: (prev) => updater(prev as MyEventsSearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: EventSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    nav((prev) => ({ ...prev, Page: page }));

  const handleLeaveEvent = (event: Pick<Event, "id" | "title">) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const hasActiveFilters = !!(
    data?.appliedFilters.search ||
    data?.appliedFilters.categoryIds ||
    data?.appliedFilters.organizationIds ||
    data?.appliedFilters.endBefore ||
    data?.appliedFilters.startDate ||
    data?.appliedFilters.onlyActive
  );

  const isEmpty = data?.pagination.totalCount === 0;

  return {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events: data,
    isEmpty,
    handleCloseModal,
    isModalOpen,
    selectedEvent,
    handleLeaveEvent,
    hasActiveFilters,
  };
};

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { MyEventsSearchParams } from "@entities/project";
import { eventQuery, type EventSortValues } from "@entities/event";

export const useEventsTab = (search: MyEventsSearchParams) => {
  const navigate = useNavigate({ from: "/projects/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data } = useQuery(eventQuery.my(search));

  const nav = (updater: (prev: MyEventsSearchParams) => MyEventsSearchParams) =>
    navigate({ search: updater, resetScroll: false });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: EventSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    nav((prev) => ({ ...prev, Page: page }));

  const isEmpty = data?.pagination.totalCount === 0;

  return {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    events: data,
    isEmpty,
  };
};

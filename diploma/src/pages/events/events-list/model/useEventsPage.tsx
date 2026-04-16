import type { EventSortValues } from "@entities/event";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const useEventsPage = () => {
  const navigate = useNavigate({ from: "/events/" });
  const search = useSearch({ from: "/_masterLayout/events/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined, Page: 1 }),
      resetScroll: false,
    });

  const handleSort = (value: EventSortValues) =>
    navigate({
      search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
      resetScroll: false,
    });

  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });

  return {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  };
};

import {
  eventQuery,
  type EventSearchParamsNoCategories,
  type EventSortValues,
} from "@entities/event";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useEventsTab = (
  search: EventSearchParamsNoCategories,
  categoryId: string,
) => {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: events } = useQuery(
    eventQuery.list({ CategoryIds: [categoryId], ...search }),
  );
  const router = useRouter();

  const nav = (
    updater: (
      prev: EventSearchParamsNoCategories,
    ) => EventSearchParamsNoCategories,
  ) =>
    navigate({
      search: (prev) => updater(prev as EventSearchParamsNoCategories),
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

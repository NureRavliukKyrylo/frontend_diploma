import type { TaskSortValues } from "@entities/task";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const useTasksPage = () => {
  const navigate = useNavigate({ from: "/tasks/" });
  const search = useSearch({ from: "/_masterLayout/tasks/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined, Page: 1 }),
      resetScroll: false,
    });

  const handleSort = (value: TaskSortValues) =>
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

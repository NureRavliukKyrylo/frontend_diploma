import {
  taskQuery,
  type TaskSearchParamsNoCategories,
  type TaskSortValues,
} from "@entities/task";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const useTasksTab = (
  search: TaskSearchParamsNoCategories,
  categoryId: string,
) => {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: tasks } = useQuery(
    taskQuery.list({ CategoryIds: [categoryId], ...search }),
  );

  const nav = (
    updater: (
      prev: TaskSearchParamsNoCategories,
    ) => TaskSearchParamsNoCategories,
  ) =>
    navigate({
      search: (prev) => updater(prev as TaskSearchParamsNoCategories),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: TaskSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    navigate({
      search: (prev) => ({ ...prev, Page: page }),
    });

  return {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
    tasks,
  };
};

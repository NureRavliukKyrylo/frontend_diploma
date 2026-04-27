import {
  taskQuery,
  type TaskSortValues,
  type TasksRequestParams,
} from "@entities/task";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const useTasksTab = (search: TasksRequestParams) => {
  const navigate = useNavigate({ from: "/activities/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data: tasks } = useQuery(taskQuery.list(search));

  const nav = (updater: (prev: TasksRequestParams) => TasksRequestParams) =>
    navigate({
      search: (prev) => updater(prev as TasksRequestParams),
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

import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  taskQuery,
  type MyTasksSearchParams,
  type TaskSortValues,
} from "@entities/task";

export const useTasksTab = (search: MyTasksSearchParams) => {
  const navigate = useNavigate({ from: "/activities/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data } = useQuery(taskQuery.my(search));

  const nav = (updater: (prev: MyTasksSearchParams) => MyTasksSearchParams) =>
    navigate({
      search: (prev) => updater(prev as MyTasksSearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: TaskSortValues) =>
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
    tasks: data,
    isEmpty,
  };
};

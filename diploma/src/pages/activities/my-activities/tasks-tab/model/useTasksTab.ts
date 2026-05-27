import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  taskQuery,
  type MyTasksRequestParams,
  type MyTasksSearchParams,
  type Task,
  type TaskSortValues,
} from "@entities/task";

export const useTasksTab = (search: MyTasksRequestParams) => {
  const navigate = useNavigate({ from: "/activities/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Pick<
    Task,
    "id" | "title"
  > | null>(null);
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

  const handleLeaveTask = (task: Pick<Task, "id" | "title">) => {
    setSelectedTask(task);
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
    tasks: data,
    isEmpty,
    isModalOpen,
    handleCloseModal,
    handleLeaveTask,
    selectedTask,
    hasActiveFilters,
  };
};

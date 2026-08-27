import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  projectQuery,
  type MyProjectsSearchParams,
  type Project,
  type ProjectSortValues,
} from "@entities/project";
import { useQuery } from "@tanstack/react-query";

export const useProjectsTab = (search: MyProjectsSearchParams) => {
  const navigate = useNavigate({ from: "/activities/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Pick<
    Project,
    "id" | "title"
  > | null>(null);
  const { data } = useQuery(projectQuery.my(search));

  const nav = (
    updater: (prev: MyProjectsSearchParams) => MyProjectsSearchParams,
  ) =>
    navigate({
      search: (prev) => updater(prev as MyProjectsSearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: ProjectSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    nav((prev) => ({ ...prev, Page: page }));

  const handleLeaveProject = (project: Pick<Project, "id" | "title">) => {
    setSelectedProject(project);
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
    projects: data,
    hasActiveFilters,
    isEmpty,
    handleCloseModal,
    isModalOpen,
    selectedProject,
    handleLeaveProject,
  };
};

import {
  projectQuery,
  type ProjectSearchParams,
  type ProjectSortValues,
} from "@entities/project";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useProjectsTab = (search: ProjectSearchParams) => {
  const navigate = useNavigate({ from: "/activities/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const { data: projects } = useQuery(projectQuery.list(search));

  const nav = (updater: (prev: ProjectSearchParams) => ProjectSearchParams) =>
    navigate({
      search: (prev) => updater(prev as ProjectSearchParams),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: ProjectSortValues) =>
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
    router,
    projects,
  };
};

import {
  projectQuery,
  type ProjectSearchParams,
  type ProjectSortValues,
} from "@entities/project";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type { BaseFiltersRoute } from "@shared/config/types";

export const useProjectsTab = (
  search: ProjectSearchParams,
  from: BaseFiltersRoute = "/activities/",
  joinedOnly = false,
) => {
  const navigate = useNavigate({ from });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const { data: projects } = useQuery(projectQuery.list(search));

  const withJoinedOnly = (params: ProjectSearchParams) =>
    joinedOnly ? { ...params, ShowJoined: true } : params;

  const nav = (updater: (prev: ProjectSearchParams) => ProjectSearchParams) =>
    navigate({
      search: (prev) => withJoinedOnly(updater(prev as ProjectSearchParams)),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: ProjectSortValues) =>
    nav((prev) => ({ ...prev, OrderBy: value, Page: 1 }));

  const handlePageChange = (page: number) =>
    navigate({
      search: (prev) =>
        withJoinedOnly({ ...(prev as ProjectSearchParams), Page: page }),
    });

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

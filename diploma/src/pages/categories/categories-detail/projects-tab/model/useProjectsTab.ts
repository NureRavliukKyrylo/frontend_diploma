import {
  projectQuery,
  type ProjectSearchParamsNoCategories,
  type ProjectSortValues,
} from "@entities/project";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export const useProjectsTab = (
  search: ProjectSearchParamsNoCategories,
  categoryId: string,
) => {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const { data: projects } = useQuery(
    projectQuery.list({ CategoryIds: [categoryId], ...search }),
  );

  const nav = (
    updater: (
      prev: ProjectSearchParamsNoCategories,
    ) => ProjectSearchParamsNoCategories,
  ) =>
    navigate({
      search: (prev) => updater(prev as ProjectSearchParamsNoCategories),
      resetScroll: false,
    });

  const handleSearch = (value: string) =>
    nav((prev) => ({ ...prev, Search: value || undefined, Page: 1 }));

  const handleSort = (value: ProjectSortValues) =>
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
    router,
    projects,
  };
};

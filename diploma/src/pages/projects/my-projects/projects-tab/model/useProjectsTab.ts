import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { type ProjectSortValues } from "@entities/project";

export const useProjectsTab = () => {
  const navigate = useNavigate({ from: "/projects/my/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined, Page: 1 }),
      resetScroll: false,
    });

  const handleSort = (value: ProjectSortValues) =>
    navigate({
      search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
      resetScroll: false,
    });

  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });

  return {
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  };
};

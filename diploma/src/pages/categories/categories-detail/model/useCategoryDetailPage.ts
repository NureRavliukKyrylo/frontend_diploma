import type { SortValues } from "@shared/config/types";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const useCategoryDetailPage = () => {
  const navigate = useNavigate({ from: "/categories/$id/" });
  const search = useSearch({ from: "/_masterLayout/categories/$id/" });
  const { id } = useParams({ from: "/_masterLayout/categories/$id/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const searchWithCategory = { ...search, CategoryIds: [id] };

  const handleSearch = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value, Page: 1 }),
      resetScroll: false,
    });

  const handleSort = (value: SortValues) =>
    navigate({
      search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
      resetScroll: false,
    });

  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });

  return {
    search,
    searchWithCategory,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  };
};

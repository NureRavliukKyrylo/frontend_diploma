import type { OrganizationSortValues } from "@entities/organization";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

export const useOrganizationsPage = () => {
  const navigate = useNavigate({ from: "/organizations/" });
  const search = useSearch({ from: "/_masterLayout/organizations/" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value: string) =>
    navigate({
      search: (prev) => ({ ...prev, Search: value || undefined, Page: 1 }),
      resetScroll: false,
    });

  const handleSort = (value: OrganizationSortValues) =>
    navigate({
      search: (prev) => ({ ...prev, OrderBy: value, Page: 1 }),
      resetScroll: false,
    });

  const handlePageChange = (page: number) =>
    navigate({ search: (prev) => ({ ...prev, Page: page }) });

  return {
    search,
    isFilterOpen,
    setIsFilterOpen,
    handleSearch,
    handleSort,
    handlePageChange,
  };
};

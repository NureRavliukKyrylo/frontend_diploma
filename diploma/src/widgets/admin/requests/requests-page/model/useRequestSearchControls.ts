import type { AdminRequestsSearchParams } from "@entities/admin";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@shared/libs/hooks";
import { useCallback, useEffect, useState } from "react";

export const useRequestSearchControls = () => {
  const navigate = useNavigate({ from: "/admin/requests/" });
  const search = useSearch({ from: "/_adminLayout/admin/requests/" });
  const [searchInput, setSearchInput] = useState(search.Search ?? "");
  const debouncedSearch = useDebounce(searchInput, 300);

  const updateSearch = useCallback(
    (patch: Partial<AdminRequestsSearchParams>) => {
      navigate({
        search: (prev) => ({ ...prev, ...patch }),
        resetScroll: false,
      });
    },
    [navigate],
  );

  useEffect(() => {
    setSearchInput(search.Search ?? "");
  }, [search.Search]);

  useEffect(() => {
    const nextSearch = debouncedSearch.trim() || undefined;
    const currentSearch = search.Search || undefined;

    if (nextSearch !== currentSearch) {
      updateSearch({ Search: nextSearch, Page: 1 });
    }
  }, [debouncedSearch, search.Search, updateSearch]);

  return {
    search,
    searchInput,
    setSearchInput,
    updateSearch,
  };
};

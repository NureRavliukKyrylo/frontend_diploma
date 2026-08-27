import type { AdminUsersSearchParams } from "@entities/admin";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@shared/libs/hooks";
import { useCallback, useEffect, useState } from "react";
import type { StatusFilter } from "../../model/types";

export const useAdminUsersSearchControls = () => {
  const navigate = useNavigate({ from: "/admin/users/" });
  const search = useSearch({ from: "/_adminLayout/admin/users/" });
  const [searchInput, setSearchInput] = useState(search.Search ?? "");
  const debouncedSearch = useDebounce(searchInput, 350);

  const updateSearch = useCallback(
    (patch: Partial<AdminUsersSearchParams>) => {
      navigate({
        search: (prev) =>
          ({
            ...prev,
            ...patch,
          }) as AdminUsersSearchParams,
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

  const handleStatusChange = useCallback(
    (value: StatusFilter) => {
      if (value === "verified") {
        updateSearch({
          EmailVerified: true,
          GoogleConnected: undefined,
          Page: 1,
        });
        return;
      }

      if (value === "unverified") {
        updateSearch({
          EmailVerified: false,
          GoogleConnected: undefined,
          Page: 1,
        });
        return;
      }

      if (value === "google") {
        updateSearch({
          EmailVerified: undefined,
          GoogleConnected: true,
          Page: 1,
        });
        return;
      }

      updateSearch({
        EmailVerified: undefined,
        GoogleConnected: undefined,
        Page: 1,
      });
    },
    [updateSearch],
  );

  return {
    search,
    searchInput,
    setSearchInput,
    updateSearch,
    handleStatusChange,
  };
};

import {
  archiveAdminBadge,
  badgesKeys,
  badgesQuery,
  deleteAdminBadge,
  recoverAdminBadge,
  type AdminBadgeListItem,
  type AdminBadgesFilter,
  type AdminBadgesSearchParams,
  type BadgeScopeEntityType,
  type BadgeSortingParams,
  type Tier,
} from "@entities/badge";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@shared/libs/hooks";
import { getErrorMessage } from "@shared/libs/error-message";
import { getAdminPageWindow } from "@widgets/admin/shared/lib/adminPagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export type BadgeArchiveFilterValue = "active" | "archived";
export type BadgeScopeFilterValue = "all" | "platform" | BadgeScopeEntityType;
export type BadgeAutoAwardFilterValue = "all" | "auto" | "manual";

export interface DeleteBadgeTarget {
  badge: AdminBadgeListItem;
  closeDrawer: boolean;
}

export const useAdminBadgesPage = () => {
  const { t } = useTranslation("admin");
  const navigate = useNavigate({ from: "/admin/badges/" });
  const search = useSearch({ from: "/_adminLayout/admin/badges/" });
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState(search.Search ?? "");
  const [selectedBadge, setSelectedBadge] = useState<AdminBadgeListItem | null>(
    null,
  );
  const [formState, setFormState] = useState<{
    mode: "create" | "edit";
    badge: AdminBadgeListItem | null;
  } | null>(null);
  const [iconBadge, setIconBadge] = useState<AdminBadgeListItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteBadgeTarget | null>(
    null,
  );
  const debouncedSearch = useDebounce(searchInput, 300);

  const invalidateBadges = useCallback(
    () => queryClient.invalidateQueries({ queryKey: badgesKeys.all() }),
    [queryClient],
  );

  const archiveMutation = useMutation({
    mutationFn: archiveAdminBadge,
    onSuccess: async () => {
      await invalidateBadges();
      addToast({ title: t("badges.archive.success"), color: "success" });
    },
    onError: (error) => {
      addToast({ title: getErrorMessage(error), color: "danger" });
    },
  });

  const recoverMutation = useMutation({
    mutationFn: recoverAdminBadge,
    onSuccess: async () => {
      await invalidateBadges();
      addToast({ title: t("badges.recover.success"), color: "success" });
    },
    onError: (error) => {
      addToast({ title: getErrorMessage(error), color: "danger" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAdminBadge,
    onSuccess: async () => {
      await invalidateBadges();
      if (deleteTarget?.closeDrawer) {
        setSelectedBadge(null);
      }
      setDeleteTarget(null);
      addToast({ title: t("badges.delete.success"), color: "success" });
    },
    onError: (error) => {
      addToast({ title: getErrorMessage(error), color: "danger" });
    },
  });

  const updateSearch = useCallback(
    (patch: Partial<AdminBadgesSearchParams>) => {
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

  const badgesParams = useMemo<AdminBadgesFilter>(
    () => ({
      Search: search.Search || undefined,
      IsArchived: search.IsArchived,
      Ranks: search.Ranks?.length ? search.Ranks : undefined,
      ScopeEntityType: search.ScopeEntityType,
      AutoAwardEnabled: search.AutoAwardEnabled,
      OrderBy: search.OrderBy as BadgeSortingParams,
      Page: search.Page,
      PageSize: search.PageSize,
    }),
    [
      search.AutoAwardEnabled,
      search.IsArchived,
      search.OrderBy,
      search.Page,
      search.PageSize,
      search.Ranks,
      search.ScopeEntityType,
      search.Search,
    ],
  );

  const badgesQueryResult = useQuery(badgesQuery.adminList(badgesParams));
  const badges = badgesQueryResult.data?.data ?? [];
  const pagination = badgesQueryResult.data?.pagination;
  const currentPage = pagination?.page || search.Page || 1;
  const totalPages = Math.max(pagination?.totalPages || 1, 1);
  const totalCount = pagination?.totalCount ?? 0;
  const pageWindow = getAdminPageWindow(currentPage, totalPages);

  const archiveFilterValue: BadgeArchiveFilterValue = search.IsArchived
    ? "archived"
    : "active";
  const scopeFilterValue: BadgeScopeFilterValue =
    search.ScopeEntityType ?? "all";
  const autoAwardFilterValue: BadgeAutoAwardFilterValue =
    search.AutoAwardEnabled === true
      ? "auto"
      : search.AutoAwardEnabled === false
        ? "manual"
        : "all";

  const toggleRank = (rank: Tier) => {
    const currentRanks = search.Ranks ?? [];
    const nextRanks = currentRanks.includes(rank)
      ? currentRanks.filter((item) => item !== rank)
      : [...currentRanks, rank];

    updateSearch({ Ranks: nextRanks.length ? nextRanks : undefined, Page: 1 });
  };

  const setArchiveFilter = (value: BadgeArchiveFilterValue) => {
    updateSearch({ IsArchived: value === "archived", Page: 1 });
  };

  const setScopeFilter = (value: BadgeScopeFilterValue) => {
    updateSearch({
      ScopeEntityType:
        value === "all" || value === "platform" ? undefined : value,
      Page: 1,
    });
  };

  const setAutoAwardFilter = (value: BadgeAutoAwardFilterValue) => {
    updateSearch({
      AutoAwardEnabled:
        value === "all" ? undefined : value === "auto" ? true : false,
      Page: 1,
    });
  };

  return {
    search,
    searchInput,
    setSearchInput,
    updateSearch,
    badges,
    badgesQueryResult,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageWindow,
    },
    selectedRanks: search.Ranks ?? [],
    toggleRank,
    archiveFilterValue,
    setArchiveFilter,
    scopeFilterValue,
    setScopeFilter,
    autoAwardFilterValue,
    setAutoAwardFilter,
    selectedBadge,
    setSelectedBadge,
    formState,
    setFormState,
    iconBadge,
    setIconBadge,
    deleteTarget,
    setDeleteTarget,
    archiveMutation,
    recoverMutation,
    deleteMutation,
  };
};

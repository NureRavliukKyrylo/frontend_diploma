import { categoryQuery } from "@entities/category";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useDebounce } from "@shared/libs/hooks";
import { getAdminPageWindow } from "@widgets/admin/shared/lib/adminPagination";
import { useDeleteCategory } from "../../category-delete-confirmation/model/useDeleteCategory";
import type { AdminCategoryCardData } from "../../lib/categoryVisuals";
import { useCallback, useEffect, useMemo, useState } from "react";

export type CategorySortingParams = "Default" | "NameAsc" | "NameDesc";

export const useAdminCategoriesPage = () => {
  const navigate = useNavigate({ from: "/admin/categories/" });
  const search = useSearch({ from: "/_adminLayout/admin/categories/" });
  const [searchInput, setSearchInput] = useState(search.Search ?? "");
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategoryCardData | null>(null);
  const [formState, setFormState] = useState<{
    mode: "create" | "edit";
    category: AdminCategoryCardData | null;
  } | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<AdminCategoryCardData | null>(null);
  const debouncedSearch = useDebounce(searchInput, 300);
  const deleteMutation = useDeleteCategory(() => {
    if (selectedCategory?.id === deleteTarget?.id) {
      setSelectedCategory(null);
    }

    setDeleteTarget(null);
  });

  const updateSearch = useCallback(
    (patch: Partial<typeof search>) => {
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

  const categoriesQuery = useQuery(
    categoryQuery.list({
      Search: search.Search || undefined,
      OrderBy: search.OrderBy,
      Page: search.Page,
      PageSize: search.PageSize,
    }),
  );
  const categories = useMemo<AdminCategoryCardData[]>(
    () =>
      (categoriesQuery.data?.data ?? []).map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        imageUrl: category.imageUrl,
      })),
    [categoriesQuery.data?.data],
  );
  const pagination = categoriesQuery.data?.pagination;
  const currentPage = pagination?.page || search.Page || 1;
  const totalPages = Math.max(pagination?.totalPages || 1, 1);
  const totalCount = pagination?.totalCount ?? 0;
  const pageWindow = getAdminPageWindow(currentPage, totalPages);

  return {
    search,
    searchInput,
    setSearchInput,
    updateSearch,
    categories,
    categoriesQuery,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageWindow,
    },
    selectedCategory,
    setSelectedCategory,
    formState,
    setFormState,
    deleteTarget,
    setDeleteTarget,
    deleteMutation,
  };
};

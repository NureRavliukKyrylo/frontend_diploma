import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useProjectFiltersCategoryStore } from "@entities/project/model/store/ProjectFiltersCategoryStore";
import { categoryDetailRoute } from "@app/routers/categories/$name";
import type { CategorySearchParams } from "@app/routers/categories/$name";

export const useProjectFilters = () => {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: categoryDetailRoute.id });
  const params = useParams({ from: categoryDetailRoute.id });
  const isInitialMount = useRef(true);

  const filters = useProjectFiltersCategoryStore((state) => state.filters);
  const setFiltersFromUrl = useProjectFiltersCategoryStore(
    (state) => state.setFiltersFromUrl
  );

  useEffect(() => {
    setFiltersFromUrl({
      startDate: searchParams.startDate,
      dueDate: searchParams.dueDate,
      rating: searchParams.rating,
      categories: searchParams.categories || [],
      organizations: searchParams.organizations || [],
      distance: searchParams.distance,
    });
  }, [
    searchParams.startDate,
    searchParams.dueDate,
    searchParams.rating,
    searchParams.categories,
    searchParams.organizations,
    searchParams.distance,
    setFiltersFromUrl,
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearch: Partial<CategorySearchParams> = {};

    if (filters.startDate) newSearch.startDate = filters.startDate;
    if (filters.dueDate) newSearch.dueDate = filters.dueDate;
    if (filters.rating !== undefined && filters.rating > 0) {
      newSearch.rating = filters.rating;
    }
    if (filters.categories.length > 0) {
      newSearch.categories = filters.categories;
    }
    if (filters.organizations.length > 0) {
      newSearch.organizations = filters.organizations;
    }
    if (filters.distance !== undefined) {
      newSearch.distance = filters.distance;
    }

    navigate({
      to: "/categories/$categoryName",
      params: { categoryName: params.categoryName },
      search: newSearch,
      replace: true,
    });
  }, [
    filters.startDate,
    filters.dueDate,
    filters.rating,
    filters.categories,
    filters.organizations,
    filters.distance,
    navigate,
  ]);

  const resetFilters = useCallback(() => {
    navigate({
      to: "/categories/$categoryName",
      params: { categoryName: params.categoryName },
      search: {},
      replace: false,
    });
  }, [navigate]);

  return {
    filters,
    resetFilters,
  };
};

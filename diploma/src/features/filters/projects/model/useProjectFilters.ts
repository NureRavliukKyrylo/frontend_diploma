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

  const startDate = useProjectFiltersCategoryStore((state) => state.startDate);
  const dueDate = useProjectFiltersCategoryStore((state) => state.dueDate);
  const rating = useProjectFiltersCategoryStore((state) => state.rating);
  const categories = useProjectFiltersCategoryStore(
    (state) => state.categories
  );
  const organizations = useProjectFiltersCategoryStore(
    (state) => state.organizations
  );
  const distance = useProjectFiltersCategoryStore((state) => state.distance);
  const search = useProjectFiltersCategoryStore((state) => state.search);
  const page = useProjectFiltersCategoryStore((state) => state.page);

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
      search: searchParams.search,
      page: searchParams.page,
    });
  }, [
    searchParams.startDate,
    searchParams.dueDate,
    searchParams.rating,
    searchParams.categories,
    searchParams.organizations,
    searchParams.distance,
    searchParams.search,
    searchParams.page,
    setFiltersFromUrl,
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const newSearch: Partial<CategorySearchParams> = {};

    if (startDate) newSearch.startDate = startDate;
    if (dueDate) newSearch.dueDate = dueDate;

    if (rating !== undefined && rating > 0) {
      newSearch.rating = rating;
    }

    if (categories.length > 0) {
      newSearch.categories = categories;
    }
    if (organizations.length > 0) {
      newSearch.organizations = organizations;
    }
    if (distance !== undefined) {
      newSearch.distance = distance;
    }

    if (search) newSearch.search = search;
    if (page && page > 1) newSearch.page = page;

    navigate({
      to: "/categories/$categoryName",
      params: { categoryName: params.categoryName },
      search: newSearch,
      replace: true,
    });
  }, [
    startDate,
    dueDate,
    rating,
    categories,
    organizations,
    distance,
    search,
    page,
    navigate,
  ]);

  const resetFilters = useCallback(() => {
    navigate({
      to: "/categories/$categoryName",
      params: { categoryName: params.categoryName },
      search: {},
      replace: false,
    });
  }, [navigate, params.categoryName]);

  return {
    filters: {
      startDate,
      dueDate,
      rating,
      categories,
      organizations,
      distance,
      search,
      page,
    },
    resetFilters,
  };
};

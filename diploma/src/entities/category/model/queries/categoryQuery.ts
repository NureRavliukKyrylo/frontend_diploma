import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getListCategories } from "@entities/category/api";
import { getCategoryById } from "@entities/category/api";
import type { CategoriesSearchParams } from "../../libs/categorySearchSchema";

export const categoryKeys = {
  all: () => ["categories"] as const,
  list: (params: CategoriesSearchParams) => [
    ...categoryKeys.all(),
    "list",
    params,
  ],
  id: (id: string) => [...categoryKeys.all(), "id", id] as const,
  infinite: (params: CategoriesSearchParams) =>
    [...categoryKeys.list(params), "infinite"] as const,
};

export const categoryQuery = {
  all: () =>
    queryOptions({
      queryKey: categoryKeys.all(),
      queryFn: () => getListCategories(),
    }),
  list: (params: CategoriesSearchParams) =>
    queryOptions({
      queryKey: categoryKeys.list(params),
      queryFn: () => getListCategories(params),
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: categoryKeys.id(id),
      queryFn: () => getCategoryById(id),
      select: (res) => res.data,
    }),
  infinite: (params: CategoriesSearchParams) =>
    infiniteQueryOptions({
      queryKey: categoryKeys.infinite(params),
      queryFn: ({ pageParam }) =>
        getListCategories({ ...params, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.pagination.nextPage ?? undefined,
      select: (data) => data.pages.flatMap((page) => page.data),
    }),
};

import { queryOptions } from "@tanstack/react-query";
import {
  getListCategories,
  type CategoryQueryParams,
} from "../api/categoriesListApi";
import { getCategoryById } from "../api/categoryIdApi";
import type { CategoriesSearchParams } from "../libs/categorySearchSchema";
export { getCategoryById } from "../api/categoryIdApi";

export const categoryKeys = {
  all: () => ["categories"] as const,
  list: (params: CategoryQueryParams) => [
    ...categoryKeys.all(),
    "list",
    params,
  ],
  id: (id: string) => [...categoryKeys.all(), "id", id] as const,
};

export const categoryQuery = {
  all: () =>
    queryOptions({
      queryKey: categoryKeys.all(),
      queryFn: () => getListCategories(),
    }),
  list: (params: CategoriesSearchParams, pageSize?: number) =>
    queryOptions({
      queryKey: categoryKeys.list({ ...params, pageSize }),
      queryFn: () => getListCategories({ ...params, pageSize }),
    }),
  id: (id: string) =>
    queryOptions({
      queryKey: categoryKeys.id(id),
      queryFn: () => getCategoryById(id),
      select: (res) => res.data,
    }),
};

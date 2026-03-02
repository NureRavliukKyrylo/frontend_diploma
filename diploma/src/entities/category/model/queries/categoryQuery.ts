import { queryOptions } from "@tanstack/react-query";
import {
  getListCategories,
  type CategoriesSearchParams,
} from "../api/categoriesListApi";
import { getCategoryById } from "../api/categoryIdApi";
export { getCategoryById } from "../api/categoryIdApi";

export const categoryKeys = {
  all: () => ["categories"] as const,
  list: (params: CategoriesSearchParams) => [
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
};

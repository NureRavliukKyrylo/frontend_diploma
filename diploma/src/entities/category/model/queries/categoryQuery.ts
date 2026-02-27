import { queryOptions } from "@tanstack/react-query";
import {
  getListCategories,
  type CategoriesSearchParams,
} from "../api/categoryApi";

export const categoryKeys = {
  all: () => ["categories"] as const,
  list: (params: CategoriesSearchParams) => [
    ...categoryKeys.all(),
    "list",
    params,
  ],
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
};

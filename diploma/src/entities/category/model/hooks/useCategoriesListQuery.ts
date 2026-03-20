import type { CategoriesSearchParams } from "@entities/category/libs/categorySearchSchema";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries/categoryQuery";
import type { Category } from "../types/Category";
import type { QueryResult } from "@shared/config/types";

export const useCategoriesListQuery =
  (params: CategoriesSearchParams) => (): QueryResult<Category> => {
    const { data } = useSuspenseQuery(categoryQuery.list(params));
    return { data: data.data };
  };

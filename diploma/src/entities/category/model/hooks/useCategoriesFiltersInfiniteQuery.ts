import { useInfiniteQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries/categoryQuery";
import type { CategoriesSearchParams } from "@entities/category/libs";
import type { QueryResult } from "@shared/config/types";
import type { Category } from "../types/Category";

export const useCategoriesFiltersInfiniteQuery =
  (params: CategoriesSearchParams) => (): QueryResult<Category> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(categoryQuery.infiniteMy(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
  };

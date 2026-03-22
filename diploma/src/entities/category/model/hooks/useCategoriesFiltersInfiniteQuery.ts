import { useInfiniteQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries";
import type { CategoriesSearchParams } from "../../libs";
import type { QueryResult } from "@shared/config/types";
import type { Category } from "../types";

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

import { useInfiniteQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries";
import type { CategoriesSearchParams } from "../../libs";
import type { QueryResult } from "@shared/config/types";
import type { Category } from "../types";

export const useCategoriesInfiniteQuery =
  (params: CategoriesSearchParams) => (): QueryResult<Category> => {
    const {
      data = [],
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isError,
    } = useInfiniteQuery(categoryQuery.infinite(params));

    return { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError };
  };

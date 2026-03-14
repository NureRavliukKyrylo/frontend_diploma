import type { CategoriesSearchParams } from "@entities/category/libs/categorySearchSchema";
import type { CategoriesQueryResult } from "../types/CategoriesResultQuery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries/categoryQuery";

export const useCategoriesListQuery =
  (params: CategoriesSearchParams) => (): CategoriesQueryResult => {
    const { data } = useSuspenseQuery(categoryQuery.list(params));
    return { data: data.data };
  };

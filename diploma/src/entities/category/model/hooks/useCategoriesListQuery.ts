import type { CategoriesSearchParams } from "../../libs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryQuery } from "../queries";
import type { Category } from "../types";
import type { QueryResult } from "@shared/config/types";

export const useCategoriesListQuery =
  (params: CategoriesSearchParams) => (): QueryResult<Category> => {
    const { data } = useSuspenseQuery(categoryQuery.list(params));
    return { data: data.data };
  };

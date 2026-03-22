import type { PaginationResponse } from "@shared/config/types";
import type { Category } from "../../model";
import { apiClient } from "@shared/api";
import type { CategoriesSearchParams } from "../../libs";

export interface CategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export const getListFilterCategories = async (
  params?: CategoriesSearchParams,
): Promise<CategoriesResponse> => {
  const response = await apiClient.get(
    "/Projects/my/volunteer/filter-categories",
    { params },
  );
  return response.data;
};

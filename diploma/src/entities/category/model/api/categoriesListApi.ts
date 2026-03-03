import type { PaginationResponse } from "@shared/config/types";
import type { Category } from "../types/Category";
import { apiClient } from "@shared/api";
import type { CategoriesSearchParams } from "../libs/categorySearchSchema";

export interface CategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export type CategoryQueryParams = CategoriesSearchParams & {
  pageSize?: number;
};

export const getListCategories = async (
  params?: CategoryQueryParams,
): Promise<CategoriesResponse> => {
  const response = await apiClient.get("/Categories/list", { params });
  return response.data;
};

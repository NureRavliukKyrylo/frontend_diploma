import type { PaginationResponse } from "@shared/config/types";
import type { Category } from "../../model";
import { apiClient } from "@shared/api";
import type { CategoriesSearchParams } from "../../libs";

export interface CategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export const getListCategories = async (
  params?: CategoriesSearchParams,
): Promise<CategoriesResponse> => {
  const response = await apiClient.get("/Categories/list", { params });
  return response.data;
};

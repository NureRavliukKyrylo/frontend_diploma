import type { PaginationResponse } from "@shared/config/types";
import type { Category } from "../types/Category";
import { apiClient } from "@shared/api";
import type z from "zod";
import type { categoriesSearchSchema } from "../libs/categorySearchSchema";

export interface CategoriesResponse {
  data: Category[];
  pagination: PaginationResponse;
}

export type CategoriesSearchParams = z.infer<typeof categoriesSearchSchema>;

export const getListCategories = async (
  params?: CategoriesSearchParams,
): Promise<CategoriesResponse> => {
  const response = await apiClient.get("/Categories/list", { params });
  return response.data;
};

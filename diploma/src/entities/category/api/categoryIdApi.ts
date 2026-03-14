import { apiClient } from "@shared/api";
import type { Category } from "../model";
import { type ApiResponse } from "@shared/api";

export const getCategoryById = async (
  id: string,
): Promise<ApiResponse<Category>> => {
  const response = await apiClient.get(`/Categories/${id}`);
  return response.data;
};

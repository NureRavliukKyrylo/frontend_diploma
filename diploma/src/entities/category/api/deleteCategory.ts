import { apiClient } from "@shared/api";

export const deleteCategory = async (categoryId: string) => {
  const response = await apiClient.delete(`/Categories/delete/${categoryId}`);
  return response.data;
};

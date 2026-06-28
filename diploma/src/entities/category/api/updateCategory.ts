import { apiClient } from "@shared/api";
import { toCategoryRequest, type CategoryMutationPayload } from "./createCategory";

export const updateCategory = async (
  categoryId: string,
  payload: CategoryMutationPayload,
) => {
  const response = await apiClient.put(
    `/Categories/update/${categoryId}`,
    toCategoryRequest(payload),
  );

  return response.data;
};

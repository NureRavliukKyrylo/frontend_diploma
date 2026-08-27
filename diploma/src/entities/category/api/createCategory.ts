import { apiClient } from "@shared/api";

export interface CategoryMutationPayload {
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  nameLocalizedUk?: string | null;
  descriptionLocalizedUk?: string | null;
}

export const toCategoryRequest = (payload: CategoryMutationPayload) => ({
  name: payload.name.trim(),
  description: payload.description?.trim() || null,
  imageUrl: payload.imageUrl?.trim() || null,
  nameLocalized: payload.nameLocalizedUk?.trim()
    ? { uk: payload.nameLocalizedUk.trim() }
    : undefined,
  descriptionLocalized: payload.descriptionLocalizedUk?.trim()
    ? { uk: payload.descriptionLocalizedUk.trim() }
    : undefined,
});

export const createCategory = async (payload: CategoryMutationPayload) => {
  const response = await apiClient.post(
    "/Categories/create",
    toCategoryRequest(payload),
  );

  return response.data;
};

import { apiClient } from "@shared/api";
import { extractOrganizationLogoUrl } from "../lib/normalizeOrganizationMutationResponse";

export const uploadOrganizationLogo = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("logo", file);

  const response = await apiClient.post<unknown>(
    `/Organization/${id}/logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return extractOrganizationLogoUrl(response.data);
};

export const deleteOrganizationLogo = async (id: string) => {
  await apiClient.delete(`/Organization/${id}/logo`);
};

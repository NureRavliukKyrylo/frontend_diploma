import { apiClient } from "@shared/api";

export const archiveOrganization = async (id: string) => {
  await apiClient.put(`/Organization/archive/${id}`);
};

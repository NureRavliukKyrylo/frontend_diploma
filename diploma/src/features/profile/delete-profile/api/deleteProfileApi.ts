import { apiClient } from "@shared/api";

export const deleteProfile = async () => {
  const response = await apiClient.delete("/User/profile");
  return response.data;
};

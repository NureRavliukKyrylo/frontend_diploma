import { apiClient } from "@shared/api";

export const logout = async () => {
  const response = await apiClient.post("Auth/logout");
  return response.data;
};

import { apiClient } from "@shared/api";

export const sendChangePasswordRequest = async () => {
  const response = await apiClient.post("Auth/change-password/request-code");
  return response.data;
};

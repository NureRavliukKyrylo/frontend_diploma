import { apiClient } from "@shared/api";

export const enableTwoFactor = async () => {
  const response = await apiClient.post("Auth/2fa/enable/request-code");
  return response.data;
};

export const disableTwoFactor = async () => {
  const response = await apiClient.post("Auth/2fa/disable/request-code");
  return response.data;
};

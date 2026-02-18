import { apiClient } from "@shared/api";

export const twoFactorVerificationEnable = async () => {
  const response = await apiClient.post("Auth/enable-2fa");
  return response.data;
};

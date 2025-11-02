import { apiClient } from "@shared/api";

export interface TwoFactorVerificationDto {
  userId?: string;
  code: string;
}

export const twoFactorVerification = async (data: TwoFactorVerificationDto) => {
  const response = await apiClient.post("Auth/verify-2fa", data);
  return response.data;
};

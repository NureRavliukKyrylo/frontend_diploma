import { apiClient } from "@shared/api";

export interface VerificationChangePasswordDto {
  userId?: string;
  code: string;
}

export const verificationChangePassword = async (
  data: VerificationChangePasswordDto,
) => {
  const response = await apiClient.post("Auth/verify-reset-code", data);
  return response.data;
};

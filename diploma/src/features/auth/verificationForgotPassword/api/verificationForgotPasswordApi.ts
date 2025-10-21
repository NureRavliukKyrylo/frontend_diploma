import { apiClient } from "@shared/api";

export interface VerificationForgotPasswordDto {
  userId?: string;
  code: string;
}

export const verificationForgotPassword = async (
  data: VerificationForgotPasswordDto
) => {
  const response = await apiClient.post("Auth/reset-password", data);
  return response.data;
};

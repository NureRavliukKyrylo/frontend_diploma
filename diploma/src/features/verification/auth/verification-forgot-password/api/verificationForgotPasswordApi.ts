import { apiClient } from "@shared/api";

export interface VerificationForgotPasswordDto {
  email?: string;
  code: string;
}

export const verificationForgotPassword = async (
  data: VerificationForgotPasswordDto
) => {
  const response = await apiClient.post("Auth/verify-reset-code", data);
  return response.data;
};

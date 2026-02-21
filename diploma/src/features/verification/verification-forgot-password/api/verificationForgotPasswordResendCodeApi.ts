import { apiClient } from "@shared/api";

export interface VerificationForgotPasswordResendCodeDto {
  email: string;
}

export const verificationForgotPasswordResendCode = async (
  data: VerificationForgotPasswordResendCodeDto,
) => {
  const response = await apiClient.post("Auth/forgot-password/resend", data);
  return response.data;
};

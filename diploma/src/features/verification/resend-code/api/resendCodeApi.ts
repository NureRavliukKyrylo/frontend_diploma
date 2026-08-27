import { apiClient } from "@shared/api";

export const resendEmailVerification = async (userId: string) => {
  const response = await apiClient.post("Auth/verify-email/resend", {
    userId,
    type: 0,
  });
  return response.data;
};

export const resendTwoFactor = async () => {
  const response = await apiClient.post("Auth/2fa/resend");
  return response.data;
};

export const resendPasswordReset = async (email: string) => {
  const response = await apiClient.post("Auth/forgot-password/resend", {
    email,
  });
  return response.data;
};

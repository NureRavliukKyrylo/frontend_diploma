import { apiClient } from "@shared/api";

export interface ForgotPasswordDto {
  email?: string;
}

export const forgotPassword = async (data: ForgotPasswordDto) => {
  const response = await apiClient.post("Auth/forgot-password", data);
  return response.data;
};

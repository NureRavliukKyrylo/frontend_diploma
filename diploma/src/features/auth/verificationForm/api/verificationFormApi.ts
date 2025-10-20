import { apiClient } from "@shared/api";

export interface VerificationEmailDto {
  userId?: string;
  code: string;
}

export const verificationEmail = async (data: VerificationEmailDto) => {
  const response = await apiClient.post("Auth/verify-email", data);
  return response.data;
};

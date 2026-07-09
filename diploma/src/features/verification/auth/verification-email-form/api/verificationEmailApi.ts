import { apiClient } from "@shared/api";
import type { SystemRole } from "@shared/config/types";

export interface VerificationEmailDto {
  userId: string;
  code: string;
}

export interface VerificationEmailResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  firstName: string;
  lastName: string;
  role: SystemRole;
  avatarUrl?: string | null;
}

export const verificationEmail = async (data: VerificationEmailDto) => {
  const response = await apiClient.post("Auth/verify-email", data);
  return response.data as VerificationEmailResponse;
};

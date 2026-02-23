import { apiClient } from "@shared/api";

export interface VerificationProfileDto {
  userId?: string;
  code: string;
}

export type VerificationType = "enable" | "disable";

const endpoints: Record<VerificationType, string> = {
  enable: "Auth/verify-2fa",
  disable: "Auth/disable/verify-code",
};

export const twoFactorVerificationProfile = async (
  data: VerificationProfileDto,
  type: VerificationType,
) => {
  const response = await apiClient.post(endpoints[type], data);
  return response.data;
};

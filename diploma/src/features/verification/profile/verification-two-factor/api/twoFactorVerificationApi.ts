import { apiClient } from "@shared/api";

export interface VerificationProfileDto {
  userId?: string;
  code: string;
}

export type VerificationType = "enable" | "disable";

const endpoints: Record<VerificationType, string> = {
  enable: "Auth/2fa/enable/verify-code",
  disable: "Auth/2fa/disable/verify-code",
};

export const twoFactorVerificationProfile = async (
  data: VerificationProfileDto,
  type: VerificationType,
) => {
  const response = await apiClient.post(endpoints[type], data);
  return response.data;
};

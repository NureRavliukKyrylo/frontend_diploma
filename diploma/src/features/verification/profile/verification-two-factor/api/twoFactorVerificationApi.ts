import { apiClient } from "@shared/api";

export interface VerificationProfileDto {
  userId?: string;
  code: string;
}

export type VerificationType = "enable" | "disable";

const endpoints: Record<VerificationType, { verify: string; confirm: string }> =
  {
    enable: {
      verify: "Auth/2fa/enable/verify-code",
      confirm: "Auth/2fa/enable/confirm",
    },
    disable: {
      verify: "Auth/2fa/disable/verify-code",
      confirm: "Auth/2fa/disable/confirm",
    },
  };

export const twoFactorVerificationProfile = async (
  data: VerificationProfileDto,
  type: VerificationType,
) => {
  const response = await apiClient.post(endpoints[type].verify, data);
  return response.data;
};

export const confirmTwoFactorVerification = async (type: VerificationType) => {
  const response = await apiClient.post(endpoints[type].confirm);
  return response.data;
};

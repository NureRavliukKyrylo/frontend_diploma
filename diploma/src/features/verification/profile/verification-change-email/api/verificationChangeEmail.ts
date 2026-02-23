import { apiClient } from "@shared/api";

export interface VerificationChangeEmailDto {
  newEmail?: string;
  code: string;
}

export type CodeType = "old-code" | "new-code";

const endpoints: Record<CodeType, string> = {
  "old-code": "Auth/change-email/verify-old-code",
  "new-code": "Auth/change-email/confirm-new-code",
};

export const verificationChangeEmail = async (
  data: VerificationChangeEmailDto,
  type: CodeType,
) => {
  const response = await apiClient.post(endpoints[type], data);
  return response.data;
};

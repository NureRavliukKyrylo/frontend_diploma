import type { CodeType } from "@features/verification";
import { apiClient } from "@shared/api";

const endpoints: Record<CodeType, string> = {
  "old-code": "Auth/change-email/request-old-code",
  "new-code": "Auth/change-email/request-new-code",
};

export interface SendChangeEmailRequestDto {
  newEmail?: string;
}

export const sendChangeEmailRequest = async (
  data?: SendChangeEmailRequestDto,
  codeType: CodeType = "old-code",
) => {
  const response = await apiClient.post(endpoints[codeType], data);
  return response.data;
};

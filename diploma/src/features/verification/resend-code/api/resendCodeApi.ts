import { apiClient } from "@shared/api";
import type { OtpType } from "@shared/config/types";

export interface ResendCodeDto {
  userId?: string;
  type: OtpType;
}
export const resendCode = async (data: ResendCodeDto) => {
  const response = await apiClient.post("Auth/resend-code", data);
  return response.data;
};

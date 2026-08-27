import { apiClient } from "@shared/api";

export interface VerificationChangePasswordDto {
  code: string;
}

export const verificationChangePassword = async (
  data: VerificationChangePasswordDto,
) => {
  const response = await apiClient.post(
    "Auth/change-password/verify-code",
    data,
  );
  return response.data;
};

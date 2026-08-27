import { apiClient } from "@shared/api";

export interface SendNewPasswordDto {
  newPassword: string;
}

export const sendNewPassword = async (data: SendNewPasswordDto) => {
  const response = await apiClient.post("Auth/change-password/confirm", data);
  return response.data;
};

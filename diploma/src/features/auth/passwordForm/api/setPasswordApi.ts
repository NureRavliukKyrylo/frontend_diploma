import { apiClient } from "@shared/api";

export type setPasswordDto = {
  userId?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export const setPassword = async (data: setPasswordDto) => {
  const payload = {
    userId: data.userId,
    newPassword: data.newPassword,
  };

  const response = await apiClient.post("Auth/reset-password", payload);
  return response.data;
};

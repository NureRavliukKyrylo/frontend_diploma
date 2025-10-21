import { apiClient } from "@shared/api";

export type setPasswordDto = {
  newPassword: string;
  confirmPassword: string;
};

export const setPassword = async (data: setPasswordDto) => {
  const response = await apiClient.post("Auth/set-password", data);
  return response.data;
};

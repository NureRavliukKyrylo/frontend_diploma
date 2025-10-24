import { apiClient } from "../../../../shared/api";

export type RegisterDto = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
};

export const register = async (data: RegisterDto) => {
  const response = await apiClient.post("Auth/register", data);
  return response.data;
};

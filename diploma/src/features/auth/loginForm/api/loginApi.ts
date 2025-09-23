import { apiClient } from "../../../../shared/api";

export type LoginDto = {
  loginEmail: string;
  password: string;
  rememberMe: boolean;
};

export const login = async (data: LoginDto) => {
  const response = await apiClient.post("Auth/login", data);
  return response.data;
};

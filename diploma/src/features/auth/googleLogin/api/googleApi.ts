import { apiClient } from "@shared/api";

export type GoogleLoginDto = {
  idToken: string;
};

export const googleLogin = async (data: GoogleLoginDto) => {
  const response = await apiClient.post("Auth/google-signin", data);
  return response.data;
};

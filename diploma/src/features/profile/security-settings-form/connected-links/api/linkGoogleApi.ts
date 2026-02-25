import { apiClient } from "@shared/api";

export interface LinkGoogleDto {
  code: string;
}

export const linkGoogle = async (data: LinkGoogleDto) => {
  const response = await apiClient.post("Auth/google/link", data);
  return response.data;
};

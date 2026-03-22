import { apiClient, type ApiResponse } from "@shared/api";
import { type User } from "../../model";

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>("User/get");
  return response.data.data;
};

import { apiClient, type ApiResponse } from "@shared/api";
import { type User } from "../../model";

export const getProfileById = async (userId: string): Promise<User> => {
  const response = await apiClient.get<ApiResponse<User>>(`User/view/${userId}`);
  return response.data.data;
};

import { apiClient } from "@shared/api";
import { type User } from "../model/types/userBaseTypes";

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>("Auth/profile");
  return response.data;
};

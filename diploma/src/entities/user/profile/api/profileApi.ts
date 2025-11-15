import { apiClient } from "@shared/api";
import { type User } from "../model/types/userBase";

export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>("Auth/profile");
  return response.data;
};

import { apiClient, type ApiResponse } from "@shared/api";
import type { Skill } from "../model";

export const getMySkills = async (): Promise<ApiResponse<Skill[]>> => {
  const response = await apiClient.get("/Skills/my");
  return response.data;
};

import { apiClient } from "@shared/api";
import type { Skill } from "../model";
import type { PaginationResponse } from "@shared/config/types";
import type { SkillsProfileSearchParams } from "../libs";

export interface SkillsResponse {
  data: Skill[];
  pagination: PaginationResponse;
}

export const getMySkills = async (
  params?: SkillsProfileSearchParams,
): Promise<SkillsResponse> => {
  const response = await apiClient.get("/Skills/my", { params });
  return response.data;
};

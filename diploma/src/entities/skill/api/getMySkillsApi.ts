import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";
import type { SkillsProfileSearchParams } from "../libs";
import type { SkillProfile } from "../model/types/SkillProfile";

export interface SkillsResponse {
  data: SkillProfile[];
  pagination: PaginationResponse;
}

export const getMySkills = async (
  params?: SkillsProfileSearchParams,
): Promise<SkillsResponse> => {
  const response = await apiClient.get("/Skills/my", { params });
  return response.data;
};

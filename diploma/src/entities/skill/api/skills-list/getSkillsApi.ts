import { apiClient } from "@shared/api";
import type { Skill } from "../../model";
import type { PaginationResponse } from "@shared/config/types";
import type { SkillsSearchParams } from "../../libs";

export interface SkillsResponse {
  data: Skill[];
  pagination: PaginationResponse;
}

export const getSkills = async (
  params?: SkillsSearchParams,
): Promise<SkillsResponse> => {
  const response = await apiClient.get("/Skills/list", { params });
  return response.data;
};

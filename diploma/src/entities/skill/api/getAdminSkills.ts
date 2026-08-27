import { apiClient } from "@shared/api";
import { normalizeSkillsListResponse } from "../libs";
import type { SkillsListParams, SkillsListResponse } from "../model/types";

export const getAdminSkills = async (
  params: SkillsListParams,
): Promise<SkillsListResponse> => {
  const response = await apiClient.get<unknown>("/Skills/list", { params });
  return normalizeSkillsListResponse(response.data);
};

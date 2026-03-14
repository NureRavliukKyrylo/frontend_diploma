import type { SkillLevel } from "@entities/skill";
import { apiClient } from "@shared/api";

export interface SkillAssignDTO {
  skillId: string;
  level: SkillLevel;
}

export const assignSkill = async (data: SkillAssignDTO) => {
  const response = await apiClient.post("Skills/assign", data);
  return response.data;
};

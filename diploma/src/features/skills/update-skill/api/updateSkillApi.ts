import type { SkillLevel } from "@entities/skill";
import { apiClient } from "@shared/api";

export interface SkillUpdateDTO {
  skillId: string;
  level: SkillLevel;
}

export const updateSkill = async (data: SkillUpdateDTO) => {
  const response = await apiClient.put("Skills/update-level", data);
  return response.data;
};

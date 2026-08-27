import { apiClient } from "@shared/api";

export interface RemoveSkillDTO {
  skillId: string;
}

export const removeSkill = async (data: RemoveSkillDTO) => {
  const response = await apiClient.delete("Skills/remove", {
    params: { skillId: data.skillId },
  });
  return response.data;
};

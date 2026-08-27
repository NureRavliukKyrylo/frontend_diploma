import { apiClient } from "@shared/api";
import { buildSkillFormData, type SkillCreatePayload } from "./createSkill";

export const updateAdminSkill = async (
  skillId: string,
  payload: SkillCreatePayload,
) => {
  const response = await apiClient.put(
    `/Skills/update/${skillId}`,
    buildSkillFormData(payload),
  );

  return response.data;
};

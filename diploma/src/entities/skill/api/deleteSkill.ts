import { apiClient } from "@shared/api";

export const deleteSkill = async (skillId: string) => {
  const response = await apiClient.delete(`/Skills/delete/${skillId}`);
  return response.data;
};

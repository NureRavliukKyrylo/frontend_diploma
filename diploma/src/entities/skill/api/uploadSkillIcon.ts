import { apiClient } from "@shared/api";

export const uploadSkillIcon = async (skillId: string, icon: File) => {
  const formData = new FormData();
  formData.append("icon", icon);

  const response = await apiClient.post(`/Skills/icon/${skillId}`, formData);

  return response.data;
};

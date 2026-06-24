import { apiClient } from "@shared/api";

export const getCountActivities = async (): Promise<{ total: number }> => {
  const result = await apiClient.get(`activities/count`);
  return result.data;
};

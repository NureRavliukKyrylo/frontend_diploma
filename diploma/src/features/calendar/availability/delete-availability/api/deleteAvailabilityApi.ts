import { apiClient } from "@shared/api";

export const deleteAvailability = async (id: string) => {
  const result = await apiClient.delete(`calendar/time-slots/${id}`);
  return result.data;
};

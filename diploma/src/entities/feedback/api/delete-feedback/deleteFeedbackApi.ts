import { apiClient } from "@shared/api";

export const deleteFeedback = async (id: string) => {
  const response = await apiClient.delete(`/Feedback/${id}`);
  return response.data;
};

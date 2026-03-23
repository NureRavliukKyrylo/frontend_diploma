import { apiClient } from "@shared/api";

export interface UpdateFeedbackDto {
  rating: number;
  comment: string;
}

export const updateFeedback = async (id: string, data: UpdateFeedbackDto) => {
  const response = await apiClient.put(`/Feedback/${id}`, data);
  return response.data;
};

import { apiClient } from "@shared/api";

export const deleteComment = async (commentId: string) => {
  const result = await apiClient.delete(`/Tasks/${commentId}/comments`);
  return result.data;
};

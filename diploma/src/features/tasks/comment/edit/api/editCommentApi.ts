import { apiClient } from "@shared/api";

export const editComment = async (
  commentId: string,
  data: { body: string },
) => {
  const result = await apiClient.put(`/Tasks/${commentId}/comments`, data);
  return result.data;
};

import { apiClient } from "@shared/api";

export const editComment = async (
  commentId: string,
  data: { body: string },
) => {
  const result = await apiClient.put(`/Tasks/comments/${commentId}`, data);
  return result.data;
};

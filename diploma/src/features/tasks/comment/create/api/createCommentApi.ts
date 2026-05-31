import { apiClient } from "@shared/api";

export interface CreateCommentDto {
  body: string;
  parentCommentId?: string;
  replyToUserId?: string;
}

export const createComment = async (taskId: string, data: CreateCommentDto) => {
  const result = await apiClient.post(`/Tasks/${taskId}/comments`, data);
  return result.data;
};

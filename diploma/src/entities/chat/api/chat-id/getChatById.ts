import type { Chat } from "@entities/chat/model";
import { apiClient, type ApiResponse } from "@shared/api";

export const getChatId = async (id: string): Promise<ApiResponse<Chat>> => {
  const result = await apiClient.get(`Chats/${id}`);
  return result.data;
};

import { apiClient } from "@shared/api";

export const leaveChat = async (chatId: string) => {
  await apiClient.post(`Chats/${chatId}/leave`);
};

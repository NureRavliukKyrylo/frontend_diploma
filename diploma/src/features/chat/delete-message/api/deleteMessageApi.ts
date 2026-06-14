import { apiClient } from "@shared/api";

export const deleteMessage = async (chatId: string, messageId: string) => {
  const result = await apiClient.delete(
    `Chats/${chatId}/messages/${messageId}`,
  );
  return result.data;
};

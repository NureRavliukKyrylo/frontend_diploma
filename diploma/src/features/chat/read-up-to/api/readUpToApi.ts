import { apiClient } from "@shared/api";

export const readUpTo = async (
  chatId: string,
  messageId: string,
): Promise<void> => {
  await apiClient.post(`Chats/${chatId}/read-up-to/${messageId}`);
};

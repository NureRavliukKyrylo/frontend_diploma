import type { Message } from "@entities/chat";
import { apiClient } from "@shared/api";

export interface EditMessageDto {
  newContent: string;
}

export const editMessage = async (
  chatId: string,
  messageId: string,
  data: EditMessageDto,
): Promise<Message> => {
  const result = await apiClient.put(
    `Chats/${chatId}/messages/${messageId}`,
    data,
  );
  return result.data.data;
};

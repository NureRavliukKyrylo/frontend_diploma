import { apiClient } from "@shared/api";

export interface EditMessageDto {
  newContent: string;
}

export const editMessage = async (
  chatId: string,
  messageId: string,
  data: EditMessageDto,
) => {
  const result = await apiClient.put(
    `Chats/${chatId}/messages/${messageId}`,
    data,
  );
  return result.data;
};

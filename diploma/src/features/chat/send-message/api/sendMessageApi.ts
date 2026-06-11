import { apiClient } from "@shared/api";

export interface SendMessageDto {
  message: string;
  replyToMessageId: string;
  mentionedUserIds: string[];
}
export const sendMessage = async (chatId: string, data: SendMessageDto) => {
  const result = await apiClient.post(`Chats/${chatId}/messages`, data);
  return result.data;
};

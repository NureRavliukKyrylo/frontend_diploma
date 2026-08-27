import { apiClient } from "@shared/api";
import type { MentionSearchResult } from "../../model";
import { readListResponse } from "./mentionResponse";

export const searchMentionsInChat = async (
  chatId: string,
): Promise<MentionSearchResult[]> => {
  const response = await apiClient.get<unknown>(
    `Chats/${chatId}/mentions/search`,
  );
  return readListResponse<MentionSearchResult>(response.data);
};

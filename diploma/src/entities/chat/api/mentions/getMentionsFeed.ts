import { apiClient } from "@shared/api";
import type { MentionFeedItem } from "../../model";
import { readListResponse } from "./mentionResponse";

interface GetMentionsFeedParams {
  chatId?: string;
  page?: number;
  pageSize?: number;
}

export const getMentionsFeed = async (
  params?: GetMentionsFeedParams,
): Promise<MentionFeedItem[]> => {
  const response = await apiClient.get<unknown>("Chats/mentions/feed", {
    params,
  });
  return readListResponse<MentionFeedItem>(response.data);
};

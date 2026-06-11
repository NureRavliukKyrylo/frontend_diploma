import type { PaginationResponse } from "@shared/config/types";
import { apiClient } from "@shared/api";
import type { Chat } from "../../model";
import type { ChatSearchQuery } from "../../libs";

export interface ChatsResponse {
  data: Chat[];
  pagination: PaginationResponse;
}

export const getListChats = async (
  params?: ChatSearchQuery,
): Promise<ChatsResponse> => {
  const response = await apiClient.get("/Chats/list", { params });
  return response.data;
};

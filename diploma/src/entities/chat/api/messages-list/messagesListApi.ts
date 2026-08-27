import type { PaginationResponse } from "@shared/config/types";
import { apiClient } from "@shared/api";
import type { Message } from "../../model";

export interface MessagesResponse {
  data: Message[];
  pagination: PaginationResponse;
}

export const getListMessages = async (
  chatid: string,
  params?: { page?: number; pageSize: number },
): Promise<MessagesResponse> => {
  const response = await apiClient.get(`/Chats/${chatid}/messages`, { params });
  return response.data;
};

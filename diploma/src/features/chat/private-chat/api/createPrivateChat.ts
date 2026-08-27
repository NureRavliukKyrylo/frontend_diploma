import { apiClient } from "@shared/api";

export const createPrivateChat = async (
  userId: string,
): Promise<{ id: string }> => {
  const result = await apiClient.post("Chats/private", { userId });
  return result.data;
};

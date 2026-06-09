import { apiClient } from "@shared/api";

export const getUnreadCount = async (): Promise<{ count: number }> => {
  const response = await apiClient.get("/Notifications/unread-count");
  return response.data;
};

import { apiClient } from "@shared/api";

export const readNotification = async (id: string) => {
  const response = await apiClient.patch(`Notifications/${id}/read`);
  return response.data;
};

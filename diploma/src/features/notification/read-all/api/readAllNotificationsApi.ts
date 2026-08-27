import { apiClient } from "@shared/api";

export const readAllNotifications = async () => {
  const response = await apiClient.patch(`Notifications/read-all`);
  return response.data;
};

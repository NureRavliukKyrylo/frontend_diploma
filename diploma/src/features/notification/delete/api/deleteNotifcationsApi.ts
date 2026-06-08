import { apiClient } from "@shared/api";

export type DeleteNotificationsDto = {
  ids: string[];
};

export const deleteNotifications = async (data: DeleteNotificationsDto) => {
  const response = await apiClient.delete(`Notifications/bulk`, { data });
  return response.data;
};

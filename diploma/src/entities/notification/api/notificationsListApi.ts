import { apiClient } from "@shared/api";
import type { PaginationResponse } from "@shared/config/types";
import type { NotificationSearchParams } from "../libs";
import type { Notification } from "../model/types/Notification";

export interface NotificationResponse {
  data: Notification[];
  pagination: PaginationResponse;
}

export const getListNotifications = async (
  params?: NotificationSearchParams,
): Promise<NotificationResponse> => {
  const response = await apiClient.get("/Notifications", { params });
  return response.data;
};

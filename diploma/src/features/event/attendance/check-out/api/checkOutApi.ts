import { apiClient } from "@shared/api";
import type { Coordinates } from "@shared/config/types";

export interface CheckOutDto {
  checkOutAt: Date;
  note?: string;
  geo: Coordinates;
}

export const checkOut = async (eventId: string, data: CheckOutDto) => {
  const result = await apiClient.post(
    `/events/${eventId}/attendance/check-out`,
    data,
  );
  return result.data;
};

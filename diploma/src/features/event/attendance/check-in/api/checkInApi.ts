import { apiClient } from "@shared/api";
import type { Coordinates } from "@shared/config/types";

export interface CheckInDto {
  checkInAt: Date;
  note?: string;
  geo: Coordinates;
}

export const checkIn = async (eventId: string, data: CheckInDto) => {
  const result = await apiClient.post(
    `/events/${eventId}/attendance/check-in`,
    data,
  );
  return result.data;
};

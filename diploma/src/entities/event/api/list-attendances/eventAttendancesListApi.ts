import { apiClient } from "@shared/api";
import type { EventAttendance } from "../../model";

export type EventAttendanceSearchParams = {
  From: Date;
  To: Date;
};

export const getEventAttendancesList = async (
  eventId: string,
  params: EventAttendanceSearchParams,
): Promise<EventAttendance[]> => {
  const result = await apiClient.get(`events/${eventId}/attendance`, {
    params,
  });
  return result.data;
};

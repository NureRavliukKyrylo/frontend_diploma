import { apiClient } from "@shared/api";
import type { EventAttendance } from "../../model";

type EventAttendanceResponse = {
  data: EventAttendance[];
};

export type EventAttendanceSearchParams = {
  From: Date;
  To: Date;
};

export const getEventAttendancesList = async (
  eventId: string,
  params: EventAttendanceSearchParams,
): Promise<EventAttendanceResponse> => {
  const result = await apiClient.get(`events/${eventId}/attendance`, {
    params,
  });
  return result.data;
};

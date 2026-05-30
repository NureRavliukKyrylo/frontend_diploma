import { apiClient } from "@shared/api";

export const disputeAttendance = async (
  eventId: string,
  attendanceId: string,
  comment: string,
) => {
  const result = await apiClient.post(
    `events/${eventId}/attendance/${attendanceId}/dispute`,
    { data: comment },
  );
  return result.data;
};

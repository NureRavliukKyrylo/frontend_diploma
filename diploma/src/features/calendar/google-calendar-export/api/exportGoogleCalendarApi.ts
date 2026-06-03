import { apiClient } from "@shared/api";

interface GoogleCalendarExportPayload {
  from: string;
  to: string;
}

export const exportGoogleCalendar = async (
  payload: GoogleCalendarExportPayload,
) => {
  const result = await apiClient.post(
    "users/me/calendar/google/export",
    payload,
  );
  return result.data;
};

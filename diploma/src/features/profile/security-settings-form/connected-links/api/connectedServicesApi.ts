import { apiClient } from "@shared/api";

export const linkGoogleAccount = async (code: string) => {
  const { data } = await apiClient.post("Auth/google/link", { code });
  return data;
};

export const unlinkGoogleAccount = async () => {
  const { data } = await apiClient.post("Auth/google/unlink/request-code");
  return data;
};

export const linkGoogleCalendar = async (code: string) => {
  const { data } = await apiClient.post("users/me/calendar/google/connect", {
    code,
    calendarId: "primary",
    importGoogleEvents: true,
    exportImpactFlowActivities: true,
    blockAvailabilityByGoogleBusy: false,
  });
  return data;
};

export const unlinkGoogleCalendar = async () => {
  const { data } = await apiClient.delete("users/me/calendar/google");
  return data;
};

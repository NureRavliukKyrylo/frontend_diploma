import { apiClient } from "@shared/api";

export interface AddAvailabilityDto {
  date: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
}

export const addAvailability = async (data: AddAvailabilityDto) => {
  const result = await apiClient.post("calendar/time-slots", data);
  return result.data;
};

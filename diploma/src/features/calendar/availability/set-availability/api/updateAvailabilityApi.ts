import { apiClient } from "@shared/api";

export interface UpdateAvailabilityDto {
  id: string;
  date: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
}

export const updateAvailability = async (data: UpdateAvailabilityDto) => {
  const result = await apiClient.put("/users/me/availability-slots", data);
  return result.data;
};

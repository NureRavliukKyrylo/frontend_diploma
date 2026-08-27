import { apiClient } from "@shared/api";

export interface UpdateAvailabilityDto {
  date: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  dayOfWeek: number | null;
  startTime: string | null;
  endTime: string | null;
  allDay: boolean;
}

export const updateAvailability = async (
  slotId: string,
  data: UpdateAvailabilityDto,
) => {
  const result = await apiClient.put(
    `/users/me/availability-slots/${slotId}`,
    data,
  );
  return result.data;
};

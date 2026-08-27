import { apiClient } from "@shared/api";

export interface StatisticsVolunteerResponse {
  totalEventsAttended: number;
  totalTasksCompleted: number;
  totalEarnedMinutes: number;
  totalSpentMinutes: number;
  availableMinutes: number;
  reservedMinutes: number;
  approvedAttendanceCount: number;
  badgesCount: number;
  currentTimeLevelCode: string;
  averageRating: number | null;
}

export const getStatisticsVolunteer =
  async (): Promise<StatisticsVolunteerResponse> => {
    const response = await apiClient.get("statistics/me");
    return response.data;
  };

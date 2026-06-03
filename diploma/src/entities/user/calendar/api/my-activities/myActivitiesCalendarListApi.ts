import { apiClient } from "@shared/api";
import type { CalendarEvent } from "../../model";
import type { ApiResponse } from "@shared/api";

export interface MyActivitiesCalendarListSearch {
  From: Date;
  To: Date;
}

export const getMyActivitiesCalendarList = async (
  params: MyActivitiesCalendarListSearch,
): Promise<ApiResponse<CalendarEvent[]>> => {
  const result = await apiClient.get("/users/me/calendar/activities", {
    params,
  });
  return result.data;
};

import { queryOptions } from "@tanstack/react-query";
import {
  getAvailabilitySlots,
  getMyActivitiesCalendarList,
  type MyActivitiesCalendarListSearch,
} from "../../api";

export const calendarKeys = {
  myActivities: (params: MyActivitiesCalendarListSearch) =>
    ["my-activities", params] as const,
  availabilitySlots: () => ["availability-slots"] as const,
};

export const calendarQuery = {
  myActivities: (params: MyActivitiesCalendarListSearch) =>
    queryOptions({
      queryKey: calendarKeys.myActivities(params),
      queryFn: () => getMyActivitiesCalendarList({ ...params }),
    }),
  availabilitySlots: () =>
    queryOptions({
      queryKey: calendarKeys.availabilitySlots(),
      queryFn: async () => {
        const res = await getAvailabilitySlots();
        return res.data;
      },
    }),
};

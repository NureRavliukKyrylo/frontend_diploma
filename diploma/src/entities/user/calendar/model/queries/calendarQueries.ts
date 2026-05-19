import { queryOptions } from "@tanstack/react-query";
import {
  getMyActivitiesCalendarList,
  type MyActivitiesCalendarListSearch,
} from "../../api";

export const calendarKeys = {
  myActivities: (params: MyActivitiesCalendarListSearch) =>
    ["my-activities", params] as const,
};

export const calendarQuery = {
  myActivities: (params: MyActivitiesCalendarListSearch) =>
    queryOptions({
      queryKey: calendarKeys.myActivities(params),
      queryFn: () => getMyActivitiesCalendarList({ ...params }),
    }),
};

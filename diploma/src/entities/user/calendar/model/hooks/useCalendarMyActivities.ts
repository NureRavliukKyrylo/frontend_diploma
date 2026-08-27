import { useQuery } from "@tanstack/react-query";
import type { EventInput } from "@fullcalendar/core/index.js";
import { calendarQuery } from "../queries/calendarQueries";
import type { MyActivitiesCalendarListSearch } from "../../api";

export const useCalendarMyActivities = (
  search: MyActivitiesCalendarListSearch,
): EventInput[] => {
  const { data } = useQuery(calendarQuery.myActivities({ ...search }));

  return (data?.data ?? []).map((event) => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    startRecur: event.startRecur,
    endRecur: event.endRecur,
    daysOfWeek: event.daysOfWeek,
    extendedProps: { type: event.type },
  }));
};

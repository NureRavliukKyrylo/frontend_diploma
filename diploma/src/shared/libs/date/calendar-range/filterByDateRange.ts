import type { CalendarView } from "@shared/config/types";
import { getCalendarRange } from "./getCalendarRange";

export const filterByDateRange = <T extends { dateFrom: Date | string }>(
  items: T[],
  view: CalendarView,
  currentDate: Date,
): T[] => {
  if (view === "month") return items;

  const { From, To } = getCalendarRange(currentDate, view);
  return items.filter((item) => {
    const date = new Date(item.dateFrom);
    return date >= From && date <= To;
  });
};

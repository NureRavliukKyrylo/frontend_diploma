import type { CalendarView } from "@shared/config/types";
import { getCalendarRange } from "./getCalendarRange";

export const filterByDateRange = <T>(
  items: T[],
  view: CalendarView,
  currentDate: Date,
  getDate: (item: T) => Date | string,
): T[] => {
  if (view === "month") return items;

  const { From, To } = getCalendarRange(currentDate, view);
  return items.filter((item) => {
    const date = new Date(getDate(item));
    return date >= From && date <= To;
  });
};

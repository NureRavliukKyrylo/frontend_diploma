import type { CalendarView } from "@shared/config/types";

export const getCalendarRange = (
  date: Date,
  tab: CalendarView = "month",
): { From: Date; To: Date } => {
  switch (tab) {
    case "month":
      return {
        From: new Date(date.getFullYear(), date.getMonth(), 1),
        To: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    case "week": {
      const day = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((day + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { From: monday, To: sunday };
    }
    case "day":
      return {
        From: date,
        To: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      };
    default:
      return {
        From: new Date(date.getFullYear(), date.getMonth(), 1),
        To: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
  }
};

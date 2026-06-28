export const getCalendarRange = (
  tab: string,
  date: Date,
): { From: Date; To: Date } => {
  switch (tab) {
    case "dayGridMonth":
      return {
        From: new Date(date.getFullYear(), date.getMonth(), 1),
        To: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    case "timeGridWeek": {
      const day = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((day + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { From: monday, To: sunday };
    }
    case "timeGridDay":
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

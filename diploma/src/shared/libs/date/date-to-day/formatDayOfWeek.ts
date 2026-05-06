export const formatDayOfWeek = (date: Date): string =>
  date.toLocaleString(navigator.language, { weekday: "long" });

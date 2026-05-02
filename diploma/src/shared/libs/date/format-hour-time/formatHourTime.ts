export const formatHourTime = (date: Date | string | null): string | null => {
  if (!date) return null;

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatHourTime = (
  date: Date | string | null,
  locale: "en" | "uk",
): string | null => {
  if (!date) return null;

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: locale === "en",
  });
};

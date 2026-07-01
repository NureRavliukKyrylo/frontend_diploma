type EventAttendanceView = "month" | "week" | "day";

export const formatTitle = (
  date: Date,
  view: EventAttendanceView,
  locale: string,
): string => {
  const year = date.getFullYear();
  const month = date.toLocaleString(locale, { month: "long" });

  if (view === "month") return `${year} ${month}`;

  if (view === "week") {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    const startLabel = start.toLocaleDateString(locale, options);
    const endLabel = end.toLocaleDateString(locale, {
      ...options,
      year: "numeric",
    });

    return `${startLabel} \u2013 ${endLabel}`;
  }

  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

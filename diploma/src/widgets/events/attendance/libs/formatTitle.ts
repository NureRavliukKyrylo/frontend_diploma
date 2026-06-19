type EventAttendanceView = "month" | "week" | "day";

export const formatTitle = (date: Date, view: EventAttendanceView): string => {
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });

  if (view === "month") return `${year} ${month}`;

  if (view === "week") {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${start.toLocaleDateString("default", opts)} – ${end.toLocaleDateString("default", { ...opts, year: "numeric" })}`;
  }

  return date.toLocaleDateString("default", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

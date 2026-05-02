import type { CalendarView } from "@shared/config/types";

export function serializeDate(view: CalendarView, date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return view === "dayGridMonth"
    ? `${year}-${month}`
    : `${year}-${month}-${day}`;
}

export function parseInitialDate(date: string | undefined): string | undefined {
  if (!date) return undefined;
  return date.length === 7 ? `${date}-01` : date;
}

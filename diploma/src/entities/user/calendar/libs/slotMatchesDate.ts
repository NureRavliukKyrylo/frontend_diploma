import type { AvailabilitySlot } from "../model";

export function slotMatchesDate(slot: AvailabilitySlot, date: Date): boolean {
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const parseSlotDate = (s: string) => {
    const [y, m, d] = s.split("T")[0].split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const target = normalize(date);

  if (slot.date) {
    return target.getTime() === parseSlotDate(slot.date).getTime();
  }

  if (slot.startDate && slot.endDate) {
    const from = parseSlotDate(slot.startDate);
    const to = parseSlotDate(slot.endDate);
    return target >= from && target <= to;
  }

  if (slot.dayOfWeek !== null) {
    return target.getDay() === slot.dayOfWeek;
  }

  return false;
}

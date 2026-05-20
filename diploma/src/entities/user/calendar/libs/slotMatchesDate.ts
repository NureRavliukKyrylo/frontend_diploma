import type { AvailabilitySlot } from "../model";

export function slotMatchesDate(slot: AvailabilitySlot, date: Date): boolean {
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const target = normalize(date);

  if (slot.date) {
    const slotDate = normalize(new Date(slot.date));
    return target.getTime() === slotDate.getTime();
  }

  if (slot.startDate && slot.endDate) {
    const from = normalize(new Date(slot.startDate));
    const to = normalize(new Date(slot.endDate));

    const inRange = target >= from && target <= to;
    if (!inRange) return false;

    if (slot.dayOfWeek !== null) {
      return target.getDay() === slot.dayOfWeek;
    }

    return true;
  }

  if (slot.dayOfWeek !== null) {
    return target.getDay() === slot.dayOfWeek;
  }

  return false;
}

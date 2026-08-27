export interface AvailabilitySlot {
  id: string;
  date: string | null;
  startDate: string | null;
  endDate: string | null;
  dayOfWeek: number | null;
  startTime: string;
  endTime: string;
  allDay: boolean;
}

import type { EntityType } from "@shared/config/types";

export interface CalendarEvent {
  id: string;
  title: string;
  type: Extract<EntityType, "event" | "task">;
  start: string;
  end: string;
  allDay: boolean;
  startRecur: string;
  endRecur: string;
  daysOfWeek: number[];
}

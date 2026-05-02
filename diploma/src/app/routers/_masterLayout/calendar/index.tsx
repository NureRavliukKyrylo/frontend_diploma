import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import {
  calendarDefaults,
  calendarSearchSchema,
  VolunteerCalendar,
} from "@pages/calendar";

export const Route = createFileRoute("/_masterLayout/calendar/")({
  component: VolunteerCalendar,
  validateSearch: calendarSearchSchema,
  search: { middlewares: [stripSearchParams(calendarDefaults)] },
});

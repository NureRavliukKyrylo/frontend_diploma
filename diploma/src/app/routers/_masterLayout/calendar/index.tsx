import { createFileRoute, stripSearchParams } from "@tanstack/react-router";
import {
  calendarDefaults,
  calendarSearchSchema,
  VolunteerCalendar,
} from "@pages/calendar";
import { getCalendarRange } from "@shared/libs/date";
import { calendarQuery } from "@entities/user/calendar";

export const Route = createFileRoute("/_masterLayout/calendar/")({
  component: VolunteerCalendar,
  validateSearch: calendarSearchSchema,
  search: { middlewares: [stripSearchParams(calendarDefaults)] },
  loader: async ({ context: { queryClient }, location }) => {
    const search = calendarSearchSchema.parse(location.search);
    const { From, To } = getCalendarRange(
      search.date ? new Date(search.date) : new Date(),
    );

    await Promise.all([
      queryClient.ensureQueryData(calendarQuery.myActivities({ From, To })),
      queryClient.ensureQueryData(calendarQuery.availabilitySlots()),
    ]);
  },
});

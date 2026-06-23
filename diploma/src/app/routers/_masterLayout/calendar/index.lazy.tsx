import { VolunteerCalendarSkeleton } from "@pages/calendar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_masterLayout/calendar/")({
  pendingComponent: VolunteerCalendarSkeleton,
});

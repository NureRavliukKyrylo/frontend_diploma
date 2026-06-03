import {
  eventJoinedDefaults,
  type AttendanceEventSearch,
} from "@entities/event";
import type { CalendarView } from "@shared/config/types";
import { getCalendarRange } from "@shared/libs/date";
import { useNavigate } from "@tanstack/react-router";
import { EventAttendanceWidget } from "@widgets/events";

interface AttendanceTabJoinedProps {
  search: AttendanceEventSearch;
  eventId: string;
  eventTitle: string;
}

export const AttendanceTabJoined = ({
  search,
  eventId,
  eventTitle,
}: AttendanceTabJoinedProps) => {
  console.log(search.view, search.date);
  const { From, To } = getCalendarRange(
    search.date ? new Date(search.date) : new Date(),
  );

  const navigate = useNavigate({ from: "/events/my/$id/" });
  const setWeekView = (view: CalendarView) => {
    navigate({ search: (prev) => ({ ...prev, view }), resetScroll: false });
  };
  const setDate = (date: string) => {
    navigate({ search: (prev) => ({ ...prev, date }), resetScroll: false });
  };
  return (
    <>
      <EventAttendanceWidget
        from={From}
        to={To}
        eventId={eventId}
        activeView={search.view ?? eventJoinedDefaults.attendance.view}
        currentDate={search.date ? new Date(search.date) : new Date()}
        onViewChange={setWeekView}
        onDateChange={setDate}
        eventTitle={eventTitle}
      />
    </>
  );
};

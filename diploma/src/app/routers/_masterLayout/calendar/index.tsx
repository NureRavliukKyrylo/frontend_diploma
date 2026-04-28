import { BaseCalendar } from "@shared/ui";
import { createFileRoute } from "@tanstack/react-router";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export const Route = createFileRoute("/_masterLayout/calendar/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={{ width: "85%" }}>
      <BaseCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}

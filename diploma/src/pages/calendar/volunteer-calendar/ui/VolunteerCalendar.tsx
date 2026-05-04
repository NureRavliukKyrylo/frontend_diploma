import styles from "./VolunteerCalendar.module.scss";
import type { EventInput } from "@fullcalendar/core/index.js";
import { BaseCalendar, CalendarEventItem } from "@shared/ui/calendar";
import { useVolunteerCalendarPage } from "../model/useVolunteerCalendarPage";
import { CalendarEventInfo } from "@widgets/calendar";
import { AnimatePresence } from "framer-motion";

const events: EventInput[] = [
  {
    id: "69eb1949b27f92a95fe614a5",
    title: "Team Sync",
    start: "2026-05-02T10:00:00",
    end: "2026-05-02T10:30:00",
    extendedProps: { type: "task" },
  },
  {
    id: "69eb1832b27f92a95fe614a4",
    title: "Fix login bug",
    start: "2026-05-02",
    allDay: true,
    extendedProps: { type: "task" },
  },
];

export const VolunteerCalendar = () => {
  const {
    initialView,
    initialDate,
    handleViewChange,
    handleNavigate,
    handleDateClick,
    activeInfo,
    currentIndex,
    handlePrev,
    handleNext,
    handleClose,
  } = useVolunteerCalendarPage(events);

  return (
    <div className={styles.volunteerCalendarWrapper}>
      <BaseCalendar
        initialView={initialView}
        initialDate={initialDate}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
        dateClick={(info) => {
          if (info.dayEl.classList.contains("fc-day-other")) return;
          handleDateClick(info.date, info.jsEvent);
        }}
        eventContent={(info) => (
          <CalendarEventItem
            info={info}
            onClick={(id, type) => console.log(id, type)}
          />
        )}
        events={events}
        dayMaxEvents={true}
      />
      <AnimatePresence mode="wait">
        {activeInfo && (
          <>
            <div className={styles.inset} onClick={handleClose} />
            <CalendarEventInfo
              activityId={activeInfo.id}
              type={activeInfo.type}
              onClose={handleClose}
              anchor={activeInfo.anchor}
              onPrev={currentIndex > 0 ? handlePrev : undefined}
              onNext={
                currentIndex < activeInfo.cellEvents.length - 1
                  ? handleNext
                  : undefined
              }
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

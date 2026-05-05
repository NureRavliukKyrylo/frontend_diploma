import styles from "./VolunteerCalendar.module.scss";
import type { EventInput } from "@fullcalendar/core/index.js";
import { BaseCalendar, CalendarEventItem } from "@shared/ui/calendar";
import { useVolunteerCalendarPage } from "../model/useVolunteerCalendarPage";
import { CalendarEventInfo } from "@widgets/calendar";
import { AnimatePresence } from "framer-motion";
import { useAvailabilityContextMenu } from "../model/useAvailabiltyContextMenu";
import { AvailabilityContextMenu } from "./AvailabilityContextMenu";

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
  const {
    calendarRef,
    menuState,
    menuItems,
    handleClose: handleCloseMenu,
  } = useAvailabilityContextMenu({
    slots: [
      { day: new Date("2026-05-05"), start: "09:00:00", end: "12:00:00" },
      { day: new Date("2026-05-07"), start: "14:00:00", end: "17:00:00" },
      { day: new Date("2026-05-12"), start: "10:00:00", end: "13:00:00" },
    ],
    onAdd: (date) => console.log("add", date),
    onUpdate: (slot, date) => console.log("update", slot, date),
    onDelete: (slot) => console.log("delete", slot),
  });
  return (
    <div className={styles.volunteerCalendarWrapper} ref={calendarRef}>
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
      {menuState && (
        <AvailabilityContextMenu
          anchor={menuState.anchor}
          menuItems={menuItems}
          onClose={handleCloseMenu}
        />
      )}
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

import styles from "./VolunteerCalendar.module.scss";
import type { EventInput } from "@fullcalendar/core/index.js";
import { BaseCalendar, CalendarEventItem } from "@shared/ui/calendar";
import { useVolunteerCalendarPage } from "../model/useVolunteerCalendarPage";
import { CalendarEventInfo } from "@widgets/calendar";
import { AnimatePresence } from "framer-motion";
import { useAvailabilityContextMenu } from "../model/useAvailabiltyContextMenu";
import { AvailabilityContextMenu } from "./AvailabilityContextMenu";
import { useState } from "react";
import { AvailabilityFormPopover } from "./AvailabilityFormPopover";

const events: EventInput[] = [
  {
    id: "69fc45fad9578c44255549cf",
    title: "Team Sync",
    start: "2026-05-02T10:00:00",
    end: "2026-05-02T10:30:00",
    extendedProps: { type: "task" },
  },
  {
    id: "69fc45fad9578c44255549d0",
    title: "Fix login bug",
    start: "2026-05-05",
    allDay: true,
    extendedProps: { type: "task" },
  },
];

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const SLOTS = [
  { day: new Date(2026, 4, 5), start: "09:00:00", end: "12:00:00" },
  { day: new Date(2026, 4, 7), start: "14:00:00", end: "17:00:00" },
  { day: new Date(2026, 4, 12), start: "10:00:00", end: "13:00:00" },
];

interface FormState {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  date: Date;
  start?: string;
  end?: string;
}

export const VolunteerCalendar = () => {
  const [formState, setFormState] = useState<FormState | null>(null);
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
    slots: SLOTS,
    onAdd: (date) => {
      setFormState({ anchor: menuState!.anchor, date });
      handleCloseMenu();
    },
    onUpdate: (slot, date) => {
      setFormState({
        anchor: menuState!.anchor,
        date,
        start: slot.start,
        end: slot.end,
      });
      handleCloseMenu();
    },
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
        dayCellClassNames={({ date }) =>
          SLOTS.some((s) => isSameDay(s.day, date))
            ? ["fc-day--has-availability"]
            : []
        }
      />

      {menuState && (
        <AvailabilityContextMenu
          anchor={menuState.anchor}
          menuItems={menuItems}
          onClose={handleCloseMenu}
        />
      )}
      <AnimatePresence mode="wait">
        {formState && (
          <AvailabilityFormPopover
            anchor={formState.anchor}
            date={formState.date}
            start={formState.start}
            end={formState.end}
            onClose={() => setFormState(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {activeInfo && (
          <>
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

import styles from "./VolunteerCalendar.module.scss";
import { BaseCalendar, CalendarEventItem } from "@shared/ui/calendar";
import { useVolunteerCalendarPage } from "../model/useVolunteerCalendarPage";
import { CalendarEventInfo } from "@widgets/calendar";
import { AnimatePresence } from "framer-motion";
import { useAvailabilityContextMenu } from "../model/useAvailabiltyContextMenu";
import { AvailabilityContextMenu } from "./AvailabilityContextMenu";
import { useState } from "react";
import { AvailabilityFormPopover } from "./AvailabilityFormPopover";
import { isSameDay } from "@shared/libs/date";
import { useSearch } from "@tanstack/react-router";
import { calendarDefaults } from "../libs/calendarSearchSchema";
import { useCalendarMyActivities } from "@entities/user/calendar";

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

export const getCalendarRange = (
  tab: string,
  date: Date,
): { From: Date; To: Date } => {
  switch (tab) {
    case "dayGridMonth":
      return {
        From: new Date(date.getFullYear(), date.getMonth(), 1),
        To: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
    case "timeGridWeek": {
      const day = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((day + 6) % 7));
      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      return { From: monday, To: sunday };
    }
    case "timeGridDay":
      return {
        From: date,
        To: date,
      };
    default:
      return {
        From: new Date(date.getFullYear(), date.getMonth(), 1),
        To: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      };
  }
};

export const VolunteerCalendar = () => {
  const [formState, setFormState] = useState<FormState | null>(null);
  const search = useSearch({ from: "/_masterLayout/calendar/" });
  const { From, To } = getCalendarRange(
    search.tab ?? calendarDefaults.tab,
    search.date ? new Date(search.date) : new Date(),
  );
  const events = useCalendarMyActivities({ From, To });

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

import styles from "./VolunteerCalendar.module.scss";
import { BaseCalendar, CalendarEventItem } from "@shared/ui/calendar";
import { useVolunteerCalendarPage } from "../../model/useVolunteerCalendarPage";
import { CalendarEventInfo } from "@widgets/calendar";
import { AnimatePresence } from "framer-motion";
import { useAvailabilityContextMenu } from "../../model/useAvailabiltyContextMenu";
import { AvailabilityContextMenu } from "../context-menu/AvailabilityContextMenu";
import { useState } from "react";
import { AvailabilityFormPopover } from "../context-menu/AvailabilityFormPopover";
import { useSearch } from "@tanstack/react-router";
import {
  calendarQuery,
  slotMatchesDate,
  useCalendarMyActivities,
  type AvailabilitySlot,
} from "@entities/user/calendar";
import { useQuery } from "@tanstack/react-query";
import {
  DeleteAvailabilityModal,
  GoogleCalendarExportButton,
} from "@features/calendar";
import { getCalendarRange } from "@shared/libs/date";
import type { CalendarTab, CalendarView } from "@shared/config/types";

interface FormState {
  anchor: Element | { getBoundingClientRect: () => DOMRect };
  date: Date;
  availability?: AvailabilitySlot;
}

const tabMapConfig: Record<CalendarTab, CalendarView> = {
  dayGridMonth: "month",
  timeGridDay: "day",
  timeGridWeek: "week",
};

export const VolunteerCalendar = () => {
  const [formState, setFormState] = useState<FormState | null>(null);
  const [deleteSlot, setDeleteSlot] = useState<AvailabilitySlot | null>(null);
  const search = useSearch({ from: "/_masterLayout/calendar/" });
  const { From, To } = getCalendarRange(
    search.date ? new Date(search.date) : new Date(),
  );
  const { From: FromCalendar, To: ToCalendar } = getCalendarRange(
    search.date ? new Date(search.date) : new Date(),
    tabMapConfig[search.tab ?? "dayGridMonth"],
  );
  const events = useCalendarMyActivities({ From, To });
  const { data } = useQuery(calendarQuery.availabilitySlots());
  const slots: AvailabilitySlot[] = data ?? [];
  console.log(slots);
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
    slots,
    onAdd: (date) => {
      setFormState({ anchor: menuState!.anchor, date });
      handleCloseMenu();
    },
    onUpdate: (slot, date) => {
      setFormState({
        anchor: menuState!.anchor,
        date,
        availability: slot,
      });
      handleCloseMenu();
    },
    onDelete: (slot) => setDeleteSlot(slot),
  });

  return (
    <div className={styles.volunteerCalendarWrapper} ref={calendarRef}>
      <GoogleCalendarExportButton from={FromCalendar} to={ToCalendar} />
      <BaseCalendar
        initialView={initialView}
        initialDate={initialDate}
        onViewChange={handleViewChange}
        onNavigate={handleNavigate}
        dateClick={(info) => {
          if (info.dayEl.classList.contains("fc-day-other")) return;
          handleDateClick(info.date, info.jsEvent);
        }}
        eventContent={(info) => <CalendarEventItem info={info} />}
        events={events}
        dayCellClassNames={({ date }) =>
          slots.some((s) => slotMatchesDate(s, date))
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
            availability={formState.availability}
            onClose={() => setFormState(null)}
          />
        )}
      </AnimatePresence>
      {deleteSlot && (
        <DeleteAvailabilityModal
          slot={deleteSlot}
          isOpen={!!deleteSlot}
          onClose={() => setDeleteSlot(null)}
        />
      )}
      <AnimatePresence mode="wait">
        {activeInfo && (
          <>
            <CalendarEventInfo
              activityId={activeInfo.id}
              title={activeInfo.title}
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

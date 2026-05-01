import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import styles from "./BaseCalendar.module.scss";
import { useRef, useState, useCallback } from "react";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "../toggle/Toggle";
import { NavigationArrow } from "@shared/assets/icons/actions";

type CalendarView = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

const VIEW_TABS: TabOption<CalendarView>[] = [
  { label: "Month", value: "dayGridMonth" },
  { label: "Week", value: "timeGridWeek" },
  { label: "Day", value: "timeGridDay" },
];

export const BaseCalendar = (props: CalendarOptions) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [activeView, setActiveView] = useState<CalendarView>("dayGridMonth");
  const [title, setTitle] = useState("");

  const syncTitle = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) setTitle(api.view.title);
  }, []);

  const handleViewChange = (view: CalendarView) => {
    setActiveView(view);
    const api = calendarRef.current?.getApi();
    if (api) {
      api.changeView(view);
      setTitle(api.view.title);
    }
    wrapperRef.current?.setAttribute("data-view", view);
  };

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
    syncTitle();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
    syncTitle();
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
    syncTitle();
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.calendarWrapper}
      data-view={activeView}
    >
      <div className={styles.headerCalendar}>
        <div className={styles.headerStart}>
          <span className={styles.calendarTitle}>{title}</span>

          <button className={styles.todayButton} onClick={handleToday}>
            Today
          </button>
        </div>
        <div className={styles.actionsCalendar}>
          <div className={styles.toggleWrapper}>
            <Toggle
              tabs={VIEW_TABS}
              activeValue={activeView}
              onChange={handleViewChange}
              buttonClassName={styles.toggleCalendarButton}
              activeButtonClassName={styles.toggleCalendarButtonActive}
              className={styles.toggleCalendar}
              pillClassName={styles.toggleCalendarPill}
            />
          </div>
          <div className={styles.navigationsBlock}>
            <button className={styles.prevButton} onClick={handlePrev}>
              <NavigationArrow />
            </button>
            <button className={styles.nextButton} onClick={handleNext}>
              <NavigationArrow />
            </button>
          </div>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        expandRows={true}
        height="auto"
        initialView={activeView}
        headerToolbar={false}
        viewDidMount={(info) => {
          wrapperRef.current?.setAttribute("data-view", info.view.type);
          setTitle(info.view.title);
        }}
        {...props}
      />
    </div>
  );
};

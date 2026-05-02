import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import styles from "./BaseCalendar.module.scss";
import { useRef, useState, useCallback, useEffect } from "react";
import type { CalendarView, TabOption } from "@shared/config/types";
import { Toggle } from "../../toggle/Toggle";
import { NavigationArrow } from "@shared/assets/icons/actions";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

const VIEW_TABS: TabOption<CalendarView>[] = [
  { label: "Month", value: "dayGridMonth" },
  { label: "Week", value: "timeGridWeek" },
  { label: "Day", value: "timeGridDay" },
];

interface BaseCalendarProps extends CalendarOptions {
  initialView?: CalendarView;
  initialDate?: string;
  onViewChange?: (view: CalendarView, date: Date) => void;
  onNavigate?: (date: Date, view: CalendarView) => void;
}

export const BaseCalendar = ({
  initialView = "dayGridMonth",
  initialDate,
  onViewChange,
  onNavigate,
  ...props
}: BaseCalendarProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [activeView, setActiveView] = useState<CalendarView>(initialView);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    if (initialView) api.changeView(initialView);
    if (initialDate) api.gotoDate(initialDate);
    syncTitle();
  }, [initialView, initialDate]);

  const syncTitle = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) setTitle(api.view.title);
  }, []);

  const handleViewChange = (view: CalendarView) => {
    setActiveView(view);
    const api = calendarRef.current?.getApi();
    if (!api) return;

    api.changeView(view);
    setTitle(api.view.title);
    wrapperRef.current?.setAttribute("data-view", view);
    onViewChange?.(view, api.getDate());
  };

  const navigate = (direction: "prev" | "next" | "today") => {
    const api = calendarRef.current?.getApi();
    if (!api) return;

    api[direction]();
    syncTitle();
    onNavigate?.(api.getDate(), activeView);
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
          <button
            className={styles.todayButton}
            onClick={() => navigate("today")}
          >
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
            <button
              className={styles.prevButton}
              onClick={() => navigate("prev")}
            >
              <NavigationArrow />
            </button>
            <button
              className={styles.nextButton}
              onClick={() => navigate("next")}
            >
              <NavigationArrow />
            </button>
          </div>
        </div>
      </div>
      <FullCalendar
        ref={calendarRef}
        expandRows={true}
        height="auto"
        initialView={initialView}
        initialDate={initialDate}
        headerToolbar={false}
        viewDidMount={(info) => {
          wrapperRef.current?.setAttribute("data-view", info.view.type);
          setTitle(info.view.title);
        }}
        eventBackgroundColor="transparent"
        eventBorderColor="transparent"
        eventTextColor="transparent"
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        {...props}
      />
    </div>
  );
};

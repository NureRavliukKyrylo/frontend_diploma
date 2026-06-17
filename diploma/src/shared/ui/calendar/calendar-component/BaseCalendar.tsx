import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import styles from "./BaseCalendar.module.scss";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import type { CalendarTab, TabOption } from "@shared/config/types";
import { Toggle } from "../../toggle/Toggle";
import { NavigationArrow } from "@shared/assets/icons/actions";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTranslation } from "react-i18next";

interface BaseCalendarProps extends CalendarOptions {
  initialView?: CalendarTab;
  initialDate?: string;
  onViewChange?: (view: CalendarTab, date: Date) => void;
  onNavigate?: (date: Date, view: CalendarTab) => void;
}

export const BaseCalendar = ({
  initialView = "dayGridMonth",
  initialDate,
  onViewChange,
  onNavigate,
  ...props
}: BaseCalendarProps) => {
  const { t } = useTranslation(["calendar"]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [activeView, setActiveView] = useState<CalendarTab>(initialView);
  const [title, setTitle] = useState("");

  const viewTabs: TabOption<CalendarTab>[] = useMemo(
    () => [
      { label: t("calendar:views.month"), value: "dayGridMonth" },
      { label: t("calendar:views.week"), value: "timeGridWeek" },
      { label: t("calendar:views.day"), value: "timeGridDay" },
    ],
    [t],
  );

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

  const handleViewChange = (view: CalendarTab) => {
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
            {t("calendar:actions.today")}
          </button>
        </div>
        <div className={styles.actionsCalendar}>
          <div className={styles.toggleWrapper}>
            <Toggle
              tabs={viewTabs}
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
        height="auto"
        expandRows={true}
        dayMaxEvents={2}
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

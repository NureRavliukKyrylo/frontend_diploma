import { Suspense } from "react";
import styles from "./EventAttendanceWidget.module.scss";
import type { CalendarView, TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
import { EventsListWidget } from "@widgets/events";
import {
  EventAttendanceListItem,
  EventAttendanceListItemSkeleton,
  eventQuery,
  type EventAttendance,
} from "@entities/event";
import { formatTitle } from "../libs/formatTitle";
import { NavigationArrow } from "@shared/assets/icons/actions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ListWidgetSkeleton } from "@shared/ui/skeleton";
import { ErrorBoundary } from "react-error-boundary";
import { getHttpErrorInfo } from "@shared/libs/error";
import { filterByDateRange } from "@shared/libs/date";

const VIEW_TABS: TabOption<CalendarView>[] = [
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
];

interface EventAttendanceWidgetProps {
  from: Date;
  to: Date;
  eventId: string;
  activeView: CalendarView;
  currentDate: Date;
  onViewChange?: (view: CalendarView) => void;
  onDateChange?: (date: string) => void;
}

export const EventAttendanceWidget = ({
  from,
  to,
  eventId,
  activeView,
  currentDate,
  onDateChange,
  onViewChange,
}: EventAttendanceWidgetProps) => {
  const navigate = (direction: "prev" | "next") => {
    const delta = direction === "next" ? 1 : -1;
    const next = new Date(currentDate);
    if (activeView === "month") next.setMonth(next.getMonth() + delta);
    else if (activeView === "week") next.setDate(next.getDate() + 7 * delta);
    else next.setDate(next.getDate() + delta);
    onDateChange?.(next.toISOString());
  };

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div className={styles.errorState}>
            <p className="errorHttpMessage">{getHttpErrorInfo(error)}</p>
            <p className="errorHint">
              Try reloading the page or come back later.
            </p>
          </div>
        );
      }}
    >
      <div className={styles.attendanceWidgetWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerStart}>
            <span className={styles.dateTitle}>
              {formatTitle(currentDate, activeView)}
            </span>
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
          <div className={styles.toggleWrapper}>
            <Toggle
              tabs={VIEW_TABS}
              activeValue={activeView}
              onChange={(view) => onViewChange?.(view)}
              buttonClassName={styles.toggleCalendarButton}
              activeButtonClassName={styles.toggleCalendarButtonActive}
              className={styles.toggleCalendar}
              pillClassName={styles.toggleCalendarPill}
            />
          </div>
        </div>

        <div className={styles.tableHeader}>
          <span className={styles.tableHeaderCell}>Date</span>
          <span className={styles.tableHeaderCell}>Description</span>
          <span className={styles.tableHeaderCell}>Status</span>
        </div>
        <Suspense
          fallback={
            <ListWidgetSkeleton
              renderSkeleton={() => <EventAttendanceListItemSkeleton />}
              className={styles.attendanceList}
            />
          }
        >
          <EventsListWidget<EventAttendance>
            useEventsQuery={() => {
              const { data } = useSuspenseQuery(
                eventQuery.eventAttendance(eventId, { From: from, To: to }),
              );
              const filtered = filterByDateRange(
                data.data,
                activeView,
                currentDate,
              );
              return { data: filtered };
            }}
            renderCard={(attendance) => (
              <EventAttendanceListItem
                key={attendance.id}
                attendance={attendance}
              />
            )}
            renderEmpty={(items) =>
              items.length === 0 ? (
                <div className={styles.emptyState}>
                  <h2>No attendance records</h2>
                  <p>There are no records for this period.</p>
                </div>
              ) : null
            }
            className={styles.attendanceList}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

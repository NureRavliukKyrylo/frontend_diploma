import { Suspense } from "react";
import styles from "./EventAttendanceWidget.module.scss";
import type { CalendarView, TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
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
import {
  CheckInButton,
  CheckOutButton,
  DisputeAttendanceButton,
} from "@features/event";

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
  eventTitle: string;
}

interface EventAttendanceContentProps {
  eventId: string;
  from: Date;
  to: Date;
  eventTitle: string;
}

const EventAttendanceContent = ({
  eventId,
  from,
  to,
  eventTitle,
}: EventAttendanceContentProps) => {
  const { data } = useSuspenseQuery(
    eventQuery.eventAttendance(eventId, { From: from, To: to }),
  );
  const attendance: EventAttendance = data.data;

  if (!attendance) {
    return (
      <div className={styles.emptyState}>
        <h2>No attendance records</h2>
        <p>There are no records for this period.</p>
      </div>
    );
  }

  return (
    <div className={styles.attendanceList}>
      <EventAttendanceListItem
        attendance={attendance}
        checkIn={<CheckInButton eventId={eventId} eventTitle={eventTitle} />}
        checkOut={<CheckOutButton eventId={eventId} eventTitle={eventTitle} />}
        disputeAttendance={
          <DisputeAttendanceButton
            attendanceId={attendance.currentAttendance.id}
            eventId={eventId}
            eventTitle={eventTitle}
          />
        }
      />
    </div>
  );
};

export const EventAttendanceWidget = ({
  from,
  to,
  eventId,
  activeView,
  currentDate,
  onDateChange,
  onViewChange,
  eventTitle,
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
          <span className={styles.tableHeaderCell}>Minutes</span>
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
          <EventAttendanceContent
            eventId={eventId}
            from={from}
            to={to}
            eventTitle={eventTitle}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

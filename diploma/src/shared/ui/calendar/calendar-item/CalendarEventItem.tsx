import type { EventContentArg } from "@fullcalendar/core/index.js";
import styles from "./CalendarEventItem.module.scss";
import type { EventType } from "@shared/config/types";
import { EVENT_COLOR } from "@shared/config/constants";
import { formatHourTime } from "@shared/libs/date";

interface CalendarEventItemProps {
  info: EventContentArg;
  onClick?: (id: string, type: EventType) => void;
}

export const CalendarEventItem = ({
  info,
  onClick,
}: CalendarEventItemProps) => {
  const type = info.event.extendedProps.type as EventType;
  const color = EVENT_COLOR[type];
  const view = info.view.type;
  const isMonthView = view === "dayGridMonth";

  return (
    <div
      className={`${styles.eventCard} ${onClick ? styles.isInteractive : ""}`}
      data-view={view}
      onClick={() => onClick?.(info.event.id, type)}
    >
      {isMonthView ? (
        <>
          <span
            className={styles.blockInfo}
            style={{
              background: color,
            }}
          />
          <span className={styles.titleMonth}>
            {info.event.start && !info.event.allDay
              ? formatHourTime(info.event.start)
              : null}{" "}
            <span className={styles.eventTitle}>{info.event.title}</span>
          </span>
        </>
      ) : (
        <div
          className={styles.wrapper}
          style={{
            background: color,
          }}
        >
          <span className={styles.titleWrapper}>{info.event.title}</span>
        </div>
      )}
    </div>
  );
};

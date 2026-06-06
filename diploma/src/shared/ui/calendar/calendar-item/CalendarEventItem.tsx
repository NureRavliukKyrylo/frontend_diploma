import type { EventContentArg } from "@fullcalendar/core/index.js";
import styles from "./CalendarEventItem.module.scss";
import type { EventType } from "@shared/config/types";
import { EVENT_COLOR } from "@shared/config/constants";
import { formatHourTime } from "@shared/libs/date";
import { Link } from "@tanstack/react-router";

interface CalendarEventItemProps {
  info: EventContentArg;
  onClick?: (id: string, type: EventType) => void;
}

const getLinkProps = (type: EventType, id: string) => {
  switch (type) {
    case "event":
      return {
        to: "/events/my/$id" as const,
        params: { id },
      };

    case "task":
      return {
        to: "/activities/my" as const,
        search: {
          tab: "tasks" as const,
          taskId: id,
        },
      };
    case "offer":
      return {
        to: "/offers/$id" as const,
        params: { id },
      };
  }
};

export const CalendarEventItem = ({ info }: CalendarEventItemProps) => {
  const type = info.event.extendedProps.type as EventType;
  const color = EVENT_COLOR[type];
  const view = info.view.type;
  const isMonthView = view === "dayGridMonth";
  const linkProps = getLinkProps(type, info.event.id);

  return (
    <Link {...linkProps} className={styles.eventCard} data-view={view}>
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
    </Link>
  );
};

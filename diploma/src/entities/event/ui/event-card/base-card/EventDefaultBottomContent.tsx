import { Calendar } from "@shared/assets/icons/info";
import styles from "./EventCardBase.module.scss";
import { ProgressCircle } from "@shared/ui";
import type { Event } from "../../../model";
import { formatDateToText } from "@shared/libs/date";

interface EventDefaultBottomContentProps {
  event: Event;
}

export const EventDefaultBottomContent = ({
  event,
}: EventDefaultBottomContentProps) => (
  <div className={styles.defaultBottomBlock}>
    <div className={styles.bottomBlock}>
      <div className={styles.deadlineBlock}>
        <Calendar className={styles.calendarEvent} />
        <span>{formatDateToText(event.endAt)}</span>
      </div>
      <div className={styles.progressBlock}>
        <ProgressCircle
          value={event.progressPercent}
          gradient={`linear-gradient(360deg, #8C0000 0%, #260000 ${event.progressPercent}%)`}
          className={styles.circle}
        />
        <h1>{event.progressPercent} %</h1>
      </div>
    </div>
    <div className={styles.dividerLine}></div>
  </div>
);

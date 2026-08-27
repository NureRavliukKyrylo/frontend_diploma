import { Calendar } from "@shared/assets/icons/info";
import styles from "./EventCardBase.module.scss";
import { ProgressCircle } from "@shared/ui";
import type { Event } from "../../../model";
import { formatDateToText } from "@shared/libs/date";
import { useTranslation } from "react-i18next";

interface EventDefaultBottomContentProps {
  event: Event;
}

export const EventDefaultBottomContent = ({
  event,
}: EventDefaultBottomContentProps) => {
  const { i18n } = useTranslation();
  return (
    <div className={styles.defaultBottomBlock}>
      <div className={styles.bottomBlock}>
        <div className={styles.deadlineBlock}>
          <Calendar className={styles.calendarEvent} />
          <span>
            {formatDateToText(event.endAt, i18n.language as "en" | "uk")}
          </span>
        </div>
        <div className={styles.progressBlock}>
          <ProgressCircle
            value={event.progress.percent}
            gradient={`linear-gradient(360deg, #8C0000 0%, #260000 ${event.progress.percent}%)`}
            className={styles.circle}
          />
          <h1>{event.progress.percent} %</h1>
        </div>
      </div>
      <div className={styles.dividerLine}></div>
    </div>
  );
};

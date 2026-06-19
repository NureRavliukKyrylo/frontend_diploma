import { useTranslation } from "react-i18next";
import type { Event } from "@entities/event";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { formatDateRange } from "@shared/libs/date";
import type { useEventPage } from "../../model/useEventPage";
import styles from "../EventPage.module.scss";

interface EventMetaChipsProps {
  event: Event;
  policyConfig: ReturnType<typeof useEventPage>["policyConfig"];
}

export const EventMetaChips = ({
  event,
  policyConfig,
}: EventMetaChipsProps) => {
  const { t, i18n } = useTranslation(["event"]);

  return (
    <div className={styles.eventMetaInfo}>
      <span className={styles.metaChipEvent}>{t("event:labels.event")}</span>
      {event.recurrence ? (
        <span className={styles.reccurenceInfo}>
          <Reccurence className={styles.reccurenceIcon} />
          <h1>
            {t(`event:modes.${event.recurrence}`, {
              defaultValue: event.recurrence,
            })}
          </h1>
        </span>
      ) : null}
      {event.endAt ? (
        <span className={`${styles.metaChip} ${styles.calendar}`}>
          <Calendar className={styles.calendarImg} />
          <span>
            {formatDateRange(
              event.startAt,
              event.endAt,
              i18n.language as "en" | "ua",
            )}
          </span>
        </span>
      ) : null}
      {policyConfig ? (
        <span
          className={`${styles.metaChip} ${styles.policy}`}
          style={{ boxShadow: policyConfig.boxShadow }}
        >
          <span
            style={{
              background: policyConfig.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {policyConfig.label}
          </span>
        </span>
      ) : null}
    </div>
  );
};

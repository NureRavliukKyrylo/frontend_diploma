import { useTranslation } from "react-i18next";
import type { Event } from "@entities/event";
import { ProgressBar } from "@shared/ui";
import styles from "../EventPage.module.scss";

interface EventStatsProps {
  event: Event;
}

export const EventStats = ({ event }: EventStatsProps) => {
  const { t } = useTranslation(["event", "common"]);

  return (
    <div className={styles.statsEventInfo}>
      <div className={styles.levelEventInfo}>
        <div className={styles.headerLevelBar}>
          <span className={styles.current}>
            {t("common:level.current", {
              level: event.progress.level ?? 0,
            })}
          </span>
          <span className={styles.xp}>
            {event.progress.currentProgress}/{event.progress.maxProgress}
          </span>
        </div>
        <ProgressBar
          current={event.progress.currentProgress ?? 0}
          max={event.progress.maxProgress}
        />
        <div className={styles.footerLevelBar}>
          <span className={styles.label}>{t("common:level.next")}</span>
          <span className={styles.next}>
            {t("common:level.current", {
              level: event.progress?.level == null ? 1 : event.progress.level + 1,
            })}
          </span>
        </div>
      </div>
      <div className={styles.ratingEventInfo}>
        <h1>{event.rating.value}</h1>
        <p>{t("event:labels.votes", { count: event.rating.totalVotes })}</p>
      </div>
    </div>
  );
};

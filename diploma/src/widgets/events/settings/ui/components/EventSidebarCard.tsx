import { formatEventDate } from "../lib/formatEventDate";
import { statusLabels } from "../config/settingsTabs";
import styles from "../SettingsWidget.module.scss";

interface EventSidebarCardProps {
  event: {
    title: string;
    organization?: { name?: string | null } | null;
    memberCount?: number | null;
    tasksTotal?: number | null;
    startAt?: string | null;
    endAt?: string | null;
  };
  eventStatus: keyof typeof statusLabels;
}

export const EventSidebarCard = ({
  event,
  eventStatus,
}: EventSidebarCardProps) => {
  const statusClassName =
    eventStatus === "active"
      ? styles.statusActive
      : eventStatus === "endingSoon"
        ? styles.statusEndingSoon
        : eventStatus === "completed"
          ? styles.statusCompleted
          : eventStatus === "cancelled"
            ? styles.statusCancelled
            : styles.statusArchived;
  const showTaskStat = typeof event.tasksTotal === "number";

  return (
    <aside className={styles.eventCard}>
      <h2>{event.title}</h2>
      <p>
        <i className="ti ti-building" aria-hidden="true" />
        {event.organization?.name ?? "Organization"}
      </p>
      <div
        className={`${styles.sidebarStats} ${
          !showTaskStat ? styles.sidebarStatsSingle : ""
        }`}
      >
        <div className={styles.sidebarStat}>
          <strong>{event.memberCount ?? 0}</strong>
          <span>Volunteers</span>
        </div>
        {showTaskStat ? (
          <div className={styles.sidebarStat}>
            <strong>{event.tasksTotal ?? 0}</strong>
            <span>Tasks</span>
          </div>
        ) : null}
      </div>

      <div className={styles.sidebarMeta}>
        <span>Start</span>
        <strong>{formatEventDate(event.startAt)}</strong>
      </div>
      <div className={styles.sidebarMeta}>
        <span>End</span>
        <strong>{formatEventDate(event.endAt)}</strong>
      </div>
      <span className={`${styles.statusBadge} ${statusClassName}`}>
        <span />
        {statusLabels[eventStatus]}
      </span>
    </aside>
  );
};

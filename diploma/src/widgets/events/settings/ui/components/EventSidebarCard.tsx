import { formatEventDate } from "../lib/formatEventDate";
import { statusLabels } from "../config/settingsTabs";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation("event");
  const locale = i18n.language === "ua" || i18n.language === "uk"
    ? "uk-UA"
    : "en-US";
  const noDate = t("settings.sidebar.noDate");
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
        {event.organization?.name ?? t("settings.sidebar.organization")}
      </p>
      <div
        className={`${styles.sidebarStats} ${
          !showTaskStat ? styles.sidebarStatsSingle : ""
        }`}
      >
        <div className={styles.sidebarStat}>
          <strong>{event.memberCount ?? 0}</strong>
          <span>{t("settings.sidebar.volunteers")}</span>
        </div>
        {showTaskStat ? (
          <div className={styles.sidebarStat}>
            <strong>{event.tasksTotal ?? 0}</strong>
            <span>{t("settings.sidebar.tasks")}</span>
          </div>
        ) : null}
      </div>

      <div className={styles.sidebarMeta}>
        <span>{t("settings.sidebar.start")}</span>
        <strong>{formatEventDate(event.startAt, locale, noDate)}</strong>
      </div>
      <div className={styles.sidebarMeta}>
        <span>{t("settings.sidebar.end")}</span>
        <strong>{formatEventDate(event.endAt, locale, noDate)}</strong>
      </div>
      <span className={`${styles.statusBadge} ${statusClassName}`}>
        <span />
        {t(statusLabels[eventStatus])}
      </span>
    </aside>
  );
};

import { useTranslation } from "react-i18next";
import { formatProjectDate } from "../lib/projectSettingsFormat";
import { statusClassNames, statusLabels } from "../config/settingsTabs";
import styles from "../SettingsWidget.module.scss";

interface ProjectSidebarCardProps {
  project: {
    title: string;
    organization?: { name?: string | null } | null;
    memberCount?: number | null;
    startAt?: string | null;
    endAt?: string | null;
  };
  projectStatus: keyof typeof statusLabels;
  progressPercent: number | null;
}

export const ProjectSidebarCard = ({
  project,
  projectStatus,
  progressPercent,
}: ProjectSidebarCardProps) => {
  const { t, i18n } = useTranslation("project");
  const intlLocale =
    i18n.language === "uk" || i18n.language === "ua" ? "uk-UA" : "en-US";
  const noDate = t("settings.sidebar.noDate");

  return (
    <aside className={styles.projectCard}>
    <h2>{project.title}</h2>
    <p>
      <i className="ti ti-building" aria-hidden="true" />
      {project.organization?.name ?? t("settings.sidebar.organization")}
    </p>
    <div
      className={`${styles.sidebarStats} ${
        progressPercent === null ? styles.sidebarStatsSingle : ""
      }`}
    >
      <div className={styles.sidebarStat}>
        <strong>{project.memberCount ?? 0}</strong>
        <span>{t("settings.sidebar.volunteers")}</span>
      </div>
      {progressPercent !== null ? (
        <div className={styles.sidebarStat}>
          <strong>{progressPercent}%</strong>
          <span>{t("settings.sidebar.progress")}</span>
        </div>
      ) : null}
    </div>

    <div className={styles.sidebarMeta}>
      <span>{t("settings.sidebar.start")}</span>
      <strong>{formatProjectDate(project.startAt, intlLocale, noDate)}</strong>
    </div>
    <div className={styles.sidebarMeta}>
      <span>{t("settings.sidebar.end")}</span>
      <strong>{formatProjectDate(project.endAt, intlLocale, noDate)}</strong>
    </div>
    <span className={`${styles.statusBadge} ${statusClassNames[projectStatus]}`}>
      <span />
      {t(statusLabels[projectStatus])}
    </span>
    </aside>
  );
};

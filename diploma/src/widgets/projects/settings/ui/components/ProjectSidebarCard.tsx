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
}: ProjectSidebarCardProps) => (
  <aside className={styles.projectCard}>
    <h2>{project.title}</h2>
    <p>
      <i className="ti ti-building" aria-hidden="true" />
      {project.organization?.name ?? "Organization"}
    </p>
    <div
      className={`${styles.sidebarStats} ${
        progressPercent === null ? styles.sidebarStatsSingle : ""
      }`}
    >
      <div className={styles.sidebarStat}>
        <strong>{project.memberCount ?? 0}</strong>
        <span>Volunteers</span>
      </div>
      {progressPercent !== null ? (
        <div className={styles.sidebarStat}>
          <strong>{progressPercent}%</strong>
          <span>Progress</span>
        </div>
      ) : null}
    </div>

    <div className={styles.sidebarMeta}>
      <span>Start</span>
      <strong>{formatProjectDate(project.startAt)}</strong>
    </div>
    <div className={styles.sidebarMeta}>
      <span>End</span>
      <strong>{formatProjectDate(project.endAt)}</strong>
    </div>
    <span className={`${styles.statusBadge} ${statusClassNames[projectStatus]}`}>
      <span />
      {statusLabels[projectStatus]}
    </span>
  </aside>
);

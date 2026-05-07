import type { ReactNode } from "react";
import type { Organization } from "../../../model";
import styles from "./OrganizationCardBase.module.scss";
import { ProgressBar } from "@shared/ui";
import { DefaultAvatar } from "@shared/assets/images/user";

const MAX_VISIBLE_PROJECTS = 2;

interface OrganizationCardBaseProps {
  organization: Organization;
  bottomContent?: ReactNode;
}

export const OrganizationCardBase = ({
  organization,
  bottomContent,
}: OrganizationCardBaseProps) => {
  const visibleProjects = organization?.projects?.slice(
    0,
    MAX_VISIBLE_PROJECTS,
  );
  const remainingCount = organization.projects
    ? organization.projects.length - MAX_VISIBLE_PROJECTS
    : 0;

  return (
    <>
      <div className={styles.headerOrganizationBlock}>
        <img
          className={styles.logo}
          src={organization.logoUrl ?? DefaultAvatar}
          alt="organization logo"
        />

        <div className={styles.headerOrganizationInfo}>
          <h1 className={styles.organizationName}>{organization.name}</h1>
          <div className={styles.organizationProgressBlock}>
            <h1 className={styles.organizationLevel}>Level 12</h1>
            <ProgressBar
              current={organization.progressPercent}
              max={organization.maxProgress}
            />
          </div>
        </div>
      </div>

      <div className={styles.projectsRelatedBlock}>
        {visibleProjects?.map((project) => (
          <span key={project.id} className={styles.projectTag}>
            {project.title}
          </span>
        ))}
        {remainingCount > 0 && (
          <span className={styles.remainingProjects}>+{remainingCount}</span>
        )}
      </div>

      <div className={styles.statsOrganizationBlock}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>{organization.rating.value}</span>
          <span className={styles.statLabel}>RATING</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {organization.totalActivities ?? 0}
          </span>
          <span className={styles.statLabel}>ALL ACTIVITIES</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {organization.activeCount ?? 0}
          </span>
          <span className={styles.statLabel}>ACTIVE</span>
        </div>
      </div>
      {bottomContent}
    </>
  );
};

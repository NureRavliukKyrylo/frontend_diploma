import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";
import { useNavigate } from "@tanstack/react-router";
import { Calendar } from "@shared/assets/icons/info";
import { AvatarGroup, ProgressBar } from "@shared/ui";
import { DefaultAvatar } from "@shared/assets/images/user";
import type { OrganizationProjectCardData } from "../lib/helpers";
import styles from "./Card.module.scss";

interface ProjectCardProps {
  project: OrganizationProjectCardData;
}

export const ProjectCard = ({
  project,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const description =
    project.description.length <= 118
      ? project.description
      : `${project.description.slice(0, 118).trimEnd()}...`;

  const handleOpenProject = () => {
    navigate({
      to: "/projects/$id",
      params: { id: project.id },
    });
  };

  return (
    <article
      className={styles.projectCard}
      role="link"
      tabIndex={0}
      aria-label={`Open project ${project.title}`}
      onClick={handleOpenProject}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenProject();
        }
      }}
    >
      <div className={styles.projectCardHeader}>
        <div className={styles.projectOrganizationBadge}>
          <img
            src={project.organizationLogoUrl ?? DefaultAvatar}
            alt={project.organizationName}
            className={styles.projectOrganizationLogo}
          />
          <span>{project.organizationName.toLowerCase()}</span>
        </div>

        <button
          type="button"
          className={styles.projectCardMenu}
          aria-label={`Project options for ${project.title}`}
          onClick={(event) => event.stopPropagation()}
        >
          <Icon path={mdiDotsHorizontal} size={1.05} />
        </button>
      </div>

      <div className={styles.projectCardBody}>
        <div className={styles.projectCopy}>
          <h3>{project.title}</h3>
          <p>{description}</p>
        </div>

        <div className={styles.projectDeadlineRow}>
          <div className={styles.projectDeadlineInfo}>
            <Calendar aria-hidden="true" />
            <span>Deadline:</span>
            <strong>{project.deadlineLabel}</strong>
          </div>
        </div>
      </div>

      <div className={styles.projectProgressBlock}>
        <div className={styles.projectProgressMeta}>
          <span>Progress</span>
          <strong>{project.progressLabel}</strong>
        </div>
        <ProgressBar current={project.progressPercent} />
      </div>

      <div className={styles.projectCardFooter}>
        {project.avatarItems.length > 0 ? (
          <AvatarGroup
            avatars={project.avatarItems}
            className={styles.projectAvatarGroup}
            avatarClassName={styles.projectAvatar}
          />
        ) : (
          <span className={styles.projectAvatarPlaceholder}>No assignees yet</span>
        )}

        <span className={styles.projectTasksLabel}>{project.progressItemsLabel}</span>
      </div>
    </article>
  );
};

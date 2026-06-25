import { useTranslation } from "react-i18next";
import type { Project } from "@entities/project";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReadMoreButton } from "@shared/ui/buttons";
import styles from "../ProjectPage.module.scss";

interface ProjectParticipationProps {
  project: Project;
}

export const ProjectParticipation = ({
  project,
}: ProjectParticipationProps) => {
  const { t } = useTranslation(["project"]);

  return (
    <div className={styles.projectFooterContent}>
      <ReadMoreButton
        collapsedHeight={90}
        className={styles.readMoreButtonContainer}
        classNameButton={styles.readMoreButtonProject}
      >
        <p>{project.description}</p>
      </ReadMoreButton>
      {project.id && project.hasPendingLeaveRequest ? (
        <p className={`${styles.pendingRequest} ${styles.leave}`}>
          {t("project:states.pendingLeave")}
        </p>
      ) : null}

      {project.id && project.hasPendingJoinRequest ? (
        <p className={styles.pendingRequest}>
          {t("project:states.pendingJoin")}
        </p>
      ) : null}

      {project.id &&
      !project.hasPendingJoinRequest &&
      !project.hasPendingLeaveRequest ? (
        <div className={styles.joinProjectBlockButton}>
          {project.isJoined ? (
            <ParticipationLeaveButton
              entityId={project.id}
              entityType="project"
              entityName={project.title}
            />
          ) : (
            <ParticipationJoinButton
              entityId={project.id}
              entityType="project"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

import { Calendar } from "@shared/assets/icons/info";
import styles from "./ProjectCardBase.module.scss";
import { AvatarGroup, ProgressBar } from "@shared/ui";
import type { Project } from "@entities/project/model/types/Project";
import { formatDateToText } from "@shared/libs/date";
import { memberPreviewToAvatar } from "@entities/project/libs";

interface ProjectDefaultBottomContentProps {
  project: Project;
}

export const ProjectDefaultBottomContent = ({
  project,
}: ProjectDefaultBottomContentProps) => (
  <>
    <div className={styles.deadlineBlock}>
      <img src={Calendar} alt="calendar-deadline" />
      <h1>
        Deadline: <span>{formatDateToText(project.endAt)}</span>
      </h1>
    </div>
    <div className={styles.progressBlock}>
      <div className={styles.progressInfo}>
        <h1>Progress</h1>
        <h2>{project.progressPercent} %</h2>
      </div>
      <ProgressBar current={project.progressPercent} />
    </div>
    <div className={styles.footerCard}>
      <AvatarGroup
        className={styles.avatarsGroup}
        avatarClassName={styles.avatarVolunteer}
        remainingClassName={styles.remainingAvatarItem}
        avatars={project.memberPreviews.map(memberPreviewToAvatar)}
        maxItems={3}
      />
      <h1>{project.tasksTotal} task</h1>
    </div>
  </>
);

import { Calendar } from "@shared/assets/icons/info";
import styles from "./ProjectCard.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";
import { AvatarGroup, ProgressBar } from "@shared/ui";
import type { AvatarItem } from "@shared/config/types";
import type { Project } from "@entities/project/model/types/Project";
import { DefaultAvatar } from "@shared/assets/images/user";
import { formatDateToInput } from "@shared/libs";

interface ProjectCardProps {
  project: Project;
  avatars: AvatarItem[];
}

export const ProjectCard = ({ project, avatars }: ProjectCardProps) => {
  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.organizationInfoBlock}>
        <img
          className={styles.imageOrganization}
          src={project.organization?.logoUrl ?? DefaultAvatar}
          alt="image organization"
        />
        <h1>{project.organization?.name ?? "Unknown Organization"}</h1>
      </div>
      <div className={styles.projectInfoBlock}>
        <h1>{project.title}</h1>
        <ReadMoreButton
          className={styles.readMoreProjectBlock}
          classNameButton={styles.readMoreProjectButton}
        >
          <p>{project.description}</p>
        </ReadMoreButton>
      </div>
      <div className={styles.deadlineBlock}>
        <img src={Calendar} alt="calendar-deadline" />
        <h1>
          Deadline: <span>{formatDateToInput(project.endAt)}</span>
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
          avatars={avatars}
        />
        <h1>{project.tasksTotal} task</h1>
      </div>
    </div>
  );
};

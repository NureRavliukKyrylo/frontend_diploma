import { Calendar } from "@shared/assets/icons/info";
import styles from "./ProjectCard.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";
import { AvatarGroup, ProgressBar } from "@shared/ui";
import type { AvatarItem } from "@shared/config/types";

interface ProjectCardProps {
  image: string;
  name: string;
  title: string;
  description: string;
  deadline: string;
  progress: number;
  avatars: AvatarItem[];
  tasks: number;
}

export const ProjectCard = ({
  image,
  name,
  title,
  description,
  deadline,
  progress,
  avatars,
  tasks,
}: ProjectCardProps) => {
  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.organizationInfoBlock}>
        <img
          className={styles.imageOrganization}
          src={image}
          alt="image organization"
        />
        <h1>{name}</h1>
      </div>
      <div className={styles.projectInfoBlock}>
        <h1>{title}</h1>
        <ReadMoreButton
          collapsedHeight={90}
          className={styles.readMoreProjectBlock}
          classNameButton={styles.readMoreProjectButton}
        >
          <p>{description}</p>
        </ReadMoreButton>
      </div>
      <div className={styles.deadlineBlock}>
        <img src={Calendar} alt="calendar-deadline" />
        <h1>
          Deadline: <span>{deadline}</span>
        </h1>
      </div>
      <div className={styles.progressBlock}>
        <div className={styles.progressInfo}>
          <h1>Progress</h1>
          <h2>{progress} %</h2>
        </div>
        <ProgressBar current={progress} />
      </div>
      <div className={styles.footerCard}>
        <AvatarGroup
          className={styles.avatarsGroup}
          avatarClassName={styles.avatarVolunteer}
          avatars={avatars}
        />
        <h1>{tasks} task</h1>
      </div>
    </div>
  );
};

import styles from "./ProjectCard.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";

interface ProjectCardProps {
  image: string;
  name: string;
  title: string;
  description: string;
}
export const ProjectCard = ({
  image,
  name,
  title,
  description,
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
    </div>
  );
};

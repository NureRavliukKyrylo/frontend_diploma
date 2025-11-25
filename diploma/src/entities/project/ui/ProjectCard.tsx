import styles from "./ProjectCard.module.scss";
import { ReadMoreButton } from "@shared/ui/buttons";

interface ProjectCardProps {
  imageOrganization: string;
  nameOrganization: string;
  titleProject: string;
  descriptionProject: string;
}
export const ProjectCard = ({
  imageOrganization,
  nameOrganization,
  titleProject,
  descriptionProject,
}: ProjectCardProps) => {
  return (
    <div className={styles.projectCardWrapper}>
      <div className={styles.organizationInfoBlock}>
        <img
          className={styles.imageOrganization}
          src={imageOrganization}
          alt="image organization"
        />
        <h1>{nameOrganization}</h1>
      </div>
      <div className={styles.projectInfoBlock}>
        <h1>{titleProject}</h1>
        <ReadMoreButton
          collapsedHeight={90}
          className={styles.readMoreProjectBlock}
          classNameButton={styles.readMoreProjectButton}
        >
          <p>{descriptionProject}</p>
        </ReadMoreButton>
      </div>
    </div>
  );
};

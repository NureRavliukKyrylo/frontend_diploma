import type { ReactNode } from "react";
import styles from "./ProjectCardBase.module.scss";
import type { Project } from "../../../model";
import { DefaultAvatar } from "@shared/assets/images/user";

interface ProjectCardBaseProps {
  project: Project;
  bottomContent?: ReactNode;
  topContent?: ReactNode;
}

export const ProjectCardBase = ({
  project,
  bottomContent,
  topContent,
}: ProjectCardBaseProps) => (
  <>
    <div className={styles.organizationInfoBlock}>
      <img
        className={styles.imageOrganization}
        src={project.organization?.logoUrl ?? DefaultAvatar}
        alt="image organization"
      />
      <h1>{project.organization?.name ?? "Unknown Organization"}</h1>
    </div>
    {topContent}
    <div className={styles.projectInfoBlock}>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
    <div className={styles.bottomContent}>{bottomContent}</div>
  </>
);

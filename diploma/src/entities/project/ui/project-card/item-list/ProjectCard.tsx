import { AvatarGroup } from "@shared/ui";
import type { Project } from "../../../model";
import { ProjectCardBase } from "../base/ProjectCardBase";
import { ProjectDefaultBottomContent } from "../base/ProjectDefaultBottomContent";
import styles from "./ProjectCard.module.scss";
import { memberPreviewToAvatar } from "@entities/user";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <div className={styles.projectCardWrapper}>
    <ProjectCardBase
      project={project}
      bottomContent={
        <>
          <ProjectDefaultBottomContent project={project} />
          <div className={styles.footerCard}>
            {project.memberPreviews?.length ? (
              <AvatarGroup
                className={styles.avatarsGroup}
                avatarClassName={styles.avatarVolunteer}
                remainingClassName={styles.remainingAvatarItem}
                avatars={project.memberPreviews.map(memberPreviewToAvatar)}
                maxItems={3}
              />
            ) : (
              <p className={styles.noMembers}>No volunteers joined yet</p>
            )}
            <h1>{project.tasksTotal} task</h1>
          </div>
        </>
      }
    />
  </div>
);

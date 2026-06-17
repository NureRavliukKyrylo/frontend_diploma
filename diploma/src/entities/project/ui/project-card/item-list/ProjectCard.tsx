import { AvatarGroup } from "@shared/ui";
import type { Project } from "../../../model";
import { ProjectCardBase } from "../base/ProjectCardBase";
import { ProjectDefaultBottomContent } from "../base/ProjectDefaultBottomContent";
import styles from "./ProjectCard.module.scss";
import { memberPreviewToAvatar } from "@entities/user";
import { useTranslation } from "react-i18next";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { t } = useTranslation(["project"]);

  return (
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
                <p className={styles.noMembers}>
                  {t("project:cards.noVolunteers")}
                </p>
              )}
              <h1>
                {t("project:cards.tasksCount", {
                  count: project.tasksTotal ?? 0,
                  defaultValue: `${project.tasksTotal} tasks`,
                })}
              </h1>
            </div>
          </>
        }
      />
    </div>
  );
};

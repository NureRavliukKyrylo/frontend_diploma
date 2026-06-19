import { motion } from "framer-motion";
import type { Project } from "@entities/project";
import { ModerationSubjectType } from "@entities/report";
import { ReportButton } from "@features/moderation";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import type { useProjectPage } from "../../model/useProjectPage";
import { ProjectMetaChips } from "./ProjectMetaChips";
import { ProjectStats } from "./ProjectStats";
import styles from "../ProjectPage.module.scss";
import { ParticipationJoinButton } from "@features/participation";

interface ProjectHeaderProps {
  project: Project;
  policyConfig: ReturnType<typeof useProjectPage>["policyConfig"];
}

export const ProjectHeader = ({
  project,
  policyConfig,
}: ProjectHeaderProps) => (
  <motion.div
    className={styles.projectPageHeader}
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.reportWrapper}>
      <ReportButton
        subjectType={ModerationSubjectType.Project}
        subjectId={project.id}
      />
    </div>
    <div className={styles.headerProjectInfo}>
      <div className={styles.mainProjectData}>
        <div className={styles.titleHeader}>
          <h1>{project.title}</h1>
          <ProjectMetaChips project={project} policyConfig={policyConfig} />
        </div>
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <LinkButtonWrapper
            to="/organizations/$id"
            params={{ id: project.organization?.id }}
            className={styles.organizationInfo}
          >
            <img
              src={project.organization?.logoUrl ?? undefined}
              alt="organization-image"
            />
            <p>{project.organization?.name}</p>
          </LinkButtonWrapper>
        </motion.div>
      </div>
    </div>
    <ProjectStats project={project} />
    <ParticipationJoinButton entityId={project.id} entityType="project" />
  </motion.div>
);

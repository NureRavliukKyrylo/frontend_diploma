import { useParams } from "@tanstack/react-router";
import styles from "./ProjectPage.module.scss";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@entities/project";
import { ProgressBar } from "@shared/ui";
import { ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/projects";
import { OverviewTab } from "../overview-tab/OverviewTab";
import { profileQuery } from "@entities/user/profile";

export const ProjectPage = () => {
  const { id } = useParams({ from: "/_masterLayout/projects/$id/" });
  const { data: project } = useQuery(projectQuery.id(id));
  const { data: user } = useQuery(profileQuery.all());

  return (
    <div className={styles.wrapperProjectPage}>
      <div className={styles.projectPageHeader}>
        <div className={styles.headerProjectInfo}>
          <h1>{project?.title}</h1>
          <div className={styles.organizationInfo}>
            <img
              src={project?.organization?.logoUrl}
              alt="organization-image"
            />
            <p>{project?.organization?.name}</p>
          </div>
        </div>
        <div className={styles.statsProjectInfo}>
          <div className={styles.levelProjectInfo}>
            <div className={styles.headerLevelBar}>
              <span className={styles.current}>Level 12</span>
              <span className={styles.xp}>{project?.progressPercent}/100</span>
            </div>
            <ProgressBar current={project?.progressPercent ?? 0} max={100} />
            <div className={styles.footerLevelBar}>
              <span className={styles.label}>Next level</span>
              <span className={styles.next}>Level 13</span>
            </div>
          </div>
          <div className={styles.ratingProjectInfo}>
            <h1>4.5</h1>
            <p>(120 votes)</p>
          </div>
        </div>
        <div className={styles.projectFooterContent}>
          <ReadMoreButton collapsedHeight={90}>
            <p>{project?.description}</p>
          </ReadMoreButton>
          <div className={styles.wrapperButton}>
            <div className={styles.joinProjectBlockButton}>
              {project?.id && <JoinProjectButton projectId={project.id} />}
            </div>
          </div>
        </div>
      </div>
      <OverviewTab project={project} user={user} />
    </div>
  );
};

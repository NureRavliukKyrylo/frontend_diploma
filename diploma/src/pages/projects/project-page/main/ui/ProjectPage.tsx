import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./ProjectPage.module.scss";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  projectDetailDefaults,
  projectQuery,
  type ProjectMode,
} from "@entities/project";
import { ProgressBar, Toggle } from "@shared/ui";
import { ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/project";
import { projectMainTabs } from "../config/projectMainTabs";
import { getProjectMainForms } from "../config/projectMainForms";
import { AnimatePresence, motion } from "framer-motion";
import { useMapUserLocation } from "@features/map";
import { eventQuery } from "@entities/event";
import { formatDateToText } from "@shared/libs/date";
import { Calendar } from "@shared/assets/icons/info";
import { getPolicyStatusConfig } from "@shared/libs/entity";

export const ProjectPage = () => {
  const { id } = useParams({ from: "/_masterLayout/projects/$id/" });
  const { tab, ...search } = useSearch({
    from: "/_masterLayout/projects/$id/",
  });
  const { data: project } = useSuspenseQuery(projectQuery.id(id));
  const { data: events } = useQuery(eventQuery.list({ ProjectIds: [id] }));
  const { user, coordinates: userLocation } = useMapUserLocation();
  const navigate = useNavigate({ from: "/projects/$id/" });

  const handleTabChange = (tab: ProjectMode) => {
    navigate({
      params: { id },
      search: projectDetailDefaults[tab],
      resetScroll: false,
    });
  };

  const policyConfig = project?.joinPolicy
    ? getPolicyStatusConfig(project.joinPolicy)
    : null;

  const forms = getProjectMainForms({
    project,
    userLocation,
    events: events?.data,
    userId: user?.id,
    search,
  });

  return (
    <div className={styles.wrapperProjectPage}>
      <motion.div
        className={styles.projectPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerProjectInfo}>
          <div className={styles.mainProjectData}>
            <div className={styles.titleHeader}>
              <h1>{project?.title}</h1>
              <div className={styles.projectMetaInfo}>
                <span className={styles.metaChipProject}>Project</span>
                {project?.endAt && (
                  <span className={`${styles.metaChip} ${styles.calendar}`}>
                    <Calendar className={styles.calendarImg} />
                    <span>{formatDateToText(project.endAt)}</span>
                  </span>
                )}
                {policyConfig && (
                  <span
                    className={`${styles.metaChip} ${styles.policy}`}
                    style={{ boxShadow: policyConfig.boxShadow }}
                  >
                    <span
                      style={{
                        background: policyConfig.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {policyConfig.label}
                    </span>
                  </span>
                )}
              </div>
            </div>
            <div className={styles.organizationInfo}>
              <img
                src={project?.organization?.logoUrl}
                alt="organization-image"
              />
              <p>{project?.organization?.name}</p>
            </div>
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
          <div className={styles.joinProjectBlockButton}>
            {project?.id && <JoinProjectButton projectId={project.id} />}
          </div>
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={projectMainTabs}
          activeValue={tab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleProjectButton}
          activeButtonClassName={styles.toggleProjectButtonActive}
          className={styles.toggleProject}
          pillClassName={styles.toggleProjectPill}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {forms[tab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

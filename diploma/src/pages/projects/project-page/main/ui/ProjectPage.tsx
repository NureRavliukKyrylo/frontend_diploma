import styles from "./ProjectPage.module.scss";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { projectMainTabs } from "../config/projectMainTabs";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar } from "@shared/assets/icons/info";
import { useProjectPage } from "../model/useProjectPage";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";

export const ProjectPage = () => {
  const { tab, project, policyConfig, forms, handleTabChange } =
    useProjectPage();

  return (
    <div className={styles.wrapperProjectPage}>
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
              <h1>{project?.title}</h1>
              <div className={styles.projectMetaInfo}>
                <span className={styles.metaChipProject}>Project</span>
                {project?.endAt && (
                  <span className={`${styles.metaChip} ${styles.calendar}`}>
                    <Calendar className={styles.calendarImg} />
                    <span>
                      {formatDateRange(project.startAt, project.endAt)}
                    </span>
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
            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <LinkButtonWrapper
                to="/organizations/$id"
                params={{ id: project.organization?.id }}
                className={styles.organizationInfo}
              >
                <img
                  src={project?.organization?.logoUrl}
                  alt="organization-image"
                />
                <p>{project?.organization?.name}</p>
              </LinkButtonWrapper>
            </motion.div>
          </div>
        </div>
        <div className={styles.statsProjectInfo}>
          <div className={styles.levelProjectInfo}>
            <div className={styles.headerLevelBar}>
              <span className={styles.current}>
                Level {project.progress.level ?? 0}
              </span>
              <span className={styles.xp}>
                {project?.progress.currentProgress}/
                {project.progress.maxProgress}
              </span>
            </div>
            <ProgressBar
              current={project?.progress.currentProgress ?? 0}
              max={project.progress.maxProgress}
            />
            <div className={styles.footerLevelBar}>
              <span className={styles.label}>Next level</span>
              <span className={styles.next}>
                Level{" "}
                {project.progress?.level == null
                  ? 1
                  : project.progress.level + 1}
              </span>
            </div>
          </div>
          <div className={styles.ratingProjectInfo}>
            <h1>{project.rating.value}</h1>
            <p>({project.rating.totalVotes} VOTES)</p>
          </div>
        </div>
        <div className={styles.projectFooterContent}>
          <ReadMoreButton
            collapsedHeight={90}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonProject}
          >
            <p>{project?.description}</p>
          </ReadMoreButton>
          {project?.id && project.hasPendingLeaveRequest && (
            <p className={`${styles.pendingRequest} ${styles.leave}`}>
              Your leave request is pending approval
            </p>
          )}

          {project?.id && project.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              Your join request is pending approval
            </p>
          )}

          {project?.id &&
            !project.hasPendingJoinRequest &&
            !project.hasPendingLeaveRequest && (
              <div className={styles.joinProjectBlockButton}>
                {project.isJoined ? (
                  <ParticipationLeaveButton
                    entityId={project.id}
                    entityType="project"
                    entityName={project.title}
                  />
                ) : (
                  <ParticipationJoinButton
                    entityId={project.id}
                    entityType="project"
                  />
                )}
              </div>
            )}
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

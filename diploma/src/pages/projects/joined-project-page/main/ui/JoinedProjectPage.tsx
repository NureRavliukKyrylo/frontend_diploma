import { AnimatePresence, motion } from "framer-motion";
import styles from "./JoinedProjectPage.module.scss";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { Calendar, ChatIcon, RoleIcon } from "@shared/assets/icons/info";
import { formatDateRange } from "@shared/libs/date";
import { useProjectJoinedPage } from "../model/useProjectJoinedPage";
import { ProgressBar, Toggle } from "@shared/ui";
import { ParticipationLeaveButton } from "@features/participation";
import { joinedProjectMainTabs } from "../config/joinedProjectMainTabs";

export const JoinedProjectPage = () => {
  const { tab, project, forms, handleTabChange } = useProjectJoinedPage();

  return (
    <div className={styles.wrapperJoinedProjectPage}>
      <motion.div
        className={styles.projectJoinedPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerJoinedProjectInfo}>
          <div className={styles.mainJoinedProjectData}>
            <div className={styles.titleHeader}>
              <h1>{project?.title}</h1>
              <div className={styles.projectJoinedMetaInfo}>
                <span className={styles.metaChipJoinedProject}>
                  Joined Project
                </span>
                {project?.endAt && (
                  <span className={`${styles.metaChip} ${styles.calendar}`}>
                    <Calendar className={styles.calendarImg} />
                    <span>
                      {formatDateRange(project.startAt, project.endAt)}
                    </span>
                  </span>
                )}
                <span className={`${styles.metaChip} ${styles.roleChip}`}>
                  <RoleIcon className={styles.role} />
                  <span>{project.currentUserRole.name}</span>
                </span>
              </div>
            </div>
            <div className={styles.chatOrganizationBlock}>
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
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <LinkButtonWrapper className={styles.chatWrapper}>
                  <ChatIcon className={styles.chatIcon} />
                  <h1>PROJECT CHAT</h1>
                </LinkButtonWrapper>
              </motion.div>
            </div>
          </div>
        </div>
        <div className={styles.statsJoinedProjectInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>
              Level {project.progress.level ?? 0}
            </span>
            <span className={styles.xp}>
              {project?.progress.currentProgress}/{project.progress.maxProgress}
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
              {project.progress?.level == null ? 1 : project.progress.level + 1}
            </span>
          </div>
        </div>
        <div className={styles.projectJoinedFooterContent}>
          <ReadMoreButton
            collapsedHeight={90}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonJoinedProject}
          >
            <p>{project?.description}</p>
          </ReadMoreButton>
          {project?.id && project.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              Your join request is pending approval
            </p>
          )}

          {project?.id && !project.hasPendingJoinRequest && (
            <div className={styles.leaveJoinedProjectBlockButton}>
              <ParticipationLeaveButton
                entityId={project.id}
                entityType="project"
                entityName={project.title}
              />
            </div>
          )}
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={joinedProjectMainTabs}
          activeValue={tab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleJoinedProjectButton}
          activeButtonClassName={styles.toggleJoinedProjectButtonActive}
          className={styles.toggleJoinedProject}
          pillClassName={styles.toggleJoinedProjectPill}
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

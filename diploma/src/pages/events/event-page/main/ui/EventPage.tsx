import styles from "./EventPage.module.scss";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { eventMainTabs } from "../config/eventMainTabs";
import { Arrow } from "@shared/assets/icons/actions";
import { useEventPage } from "../model/useEventPage";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReportButton } from "@features/moderation";
import { ModerationSubjectType } from "@entities/report";

export const EventPage = () => {
  const { tab, event, policyConfig, forms, handleTabChange } = useEventPage();

  return (
    <div className={styles.wrapperEventPage}>
      <motion.div
        className={styles.eventPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerEventInfo}>
          <div className={styles.reportWrapper}>
            <ReportButton
              subjectType={ModerationSubjectType.Event}
              subjectId={event.id}
            />
          </div>
          <div className={styles.mainEventData}>
            <div className={styles.eventOrganizationInfo}>
              <div className={styles.titleHeader}>
                <h1>{event?.title}</h1>
                <div className={styles.eventMetaInfo}>
                  <span className={styles.metaChipEvent}>Event</span>
                  {event?.recurrence && (
                    <span className={styles.reccurenceInfo}>
                      <Reccurence className={styles.reccurenceIcon} />
                      <h1>{event.recurrence}</h1>
                    </span>
                  )}
                  {event?.endAt && (
                    <span className={`${styles.metaChip} ${styles.calendar}`}>
                      <Calendar className={styles.calendarImg} />
                      <span>{formatDateRange(event.startAt, event.endAt)}</span>
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
                  params={{ id: event.organization?.id }}
                  className={styles.organizationInfo}
                >
                  <img
                    src={event?.organization?.logoUrl}
                    alt="organization-image"
                  />
                  <p>{event?.organization?.name}</p>
                </LinkButtonWrapper>
              </motion.div>
            </div>
            {event?.project && (
              <div className={styles.projectPill}>
                <h1>PROJECT</h1>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <LinkButtonWrapper
                    to="/projects/$id"
                    params={{ id: event.project?.id }}
                    className={styles.goToProject}
                  >
                    <Arrow className={styles.toProjectArrow} />
                  </LinkButtonWrapper>
                </motion.div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.statsEventInfo}>
          <div className={styles.levelEventInfo}>
            <div className={styles.headerLevelBar}>
              <span className={styles.current}>
                Level {event.progress.level ?? 0}
              </span>
              <span className={styles.xp}>
                {event?.progress.currentProgress}/{event.progress.maxProgress}
              </span>
            </div>
            <ProgressBar
              current={event?.progress.currentProgress ?? 0}
              max={event.progress.maxProgress}
            />
            <div className={styles.footerLevelBar}>
              <span className={styles.label}>Next level</span>
              <span className={styles.next}>
                Level{" "}
                {event.progress?.level == null ? 1 : event.progress.level + 1}
              </span>
            </div>
          </div>
          <div className={styles.ratingEventInfo}>
            <h1>{event.rating.value}</h1>
            <p>({event.rating.totalVotes} votes)</p>
          </div>
        </div>
        <div className={styles.eventFooterContent}>
          <ReadMoreButton
            collapsedHeight={90}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonEvent}
          >
            <p>{event?.description}</p>
          </ReadMoreButton>
          {event?.id && event.hasPendingLeaveRequest && (
            <p className={`${styles.pendingRequest} ${styles.leave}`}>
              Your leave request is pending approval
            </p>
          )}

          {event?.id && event.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              Your join request is pending approval
            </p>
          )}

          {event?.id &&
            !event.hasPendingJoinRequest &&
            !event.hasPendingLeaveRequest && (
              <div className={styles.joinEventBlockButton}>
                {event.isJoined ? (
                  <ParticipationLeaveButton
                    entityId={event.id}
                    entityType="event"
                    entityName={event.title}
                  />
                ) : (
                  <ParticipationJoinButton
                    entityId={event.id}
                    entityType="event"
                  />
                )}
              </div>
            )}
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={eventMainTabs}
          activeValue={tab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleEventButton}
          activeButtonClassName={styles.toggleEventButtonActive}
          className={styles.toggleEvent}
          pillClassName={styles.toggleEventPill}
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

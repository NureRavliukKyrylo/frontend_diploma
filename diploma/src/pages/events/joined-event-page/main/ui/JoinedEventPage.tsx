import styles from "./EventPage.module.scss";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateToText } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import { ParticipationLeaveButton } from "@features/participation";
import { eventJoinedMainTabs } from "../config/eventJoinedMainTabs";
import { useJoinedEventPage } from "../model/useJoinedEventPage";

export const JoinedEventPage = () => {
  const { tab, event, forms, handleTabChange } = useJoinedEventPage();

  return (
    <div className={styles.wrapperEventPage}>
      <motion.div
        className={styles.eventPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerEventInfo}>
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
                      <span>{formatDateToText(event.endAt)}</span>
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
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>Level 12</span>
            <span className={styles.xp}>{event?.progressPercent}/100</span>
          </div>
          <ProgressBar current={event?.progressPercent ?? 0} max={100} />
          <div className={styles.footerLevelBar}>
            <span className={styles.label}>Next level</span>
            <span className={styles.next}>Level 13</span>
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
          {event?.id && event.hasPendingJoinRequest && (
            <p className={styles.pendingRequest}>
              Your join request is pending approval
            </p>
          )}

          {event?.id && (
            <div className={styles.leaveEventBlockButton}>
              <ParticipationLeaveButton
                entityId={event.id}
                entityType="event"
                entityName={event.title}
              />
            </div>
          )}
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={eventJoinedMainTabs}
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

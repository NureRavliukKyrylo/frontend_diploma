import styles from "./JoinedEventPage.module.scss";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { AnimatePresence, motion } from "framer-motion";
import { formatDateRange } from "@shared/libs/date";
import { Calendar, Reccurence, RoleIcon } from "@shared/assets/icons/info";
import { Arrow } from "@shared/assets/icons/actions";
import { ParticipationLeaveButton } from "@features/participation";
import { getEventJoinedMainTabs } from "../config/eventJoinedMainTabs";
import { useJoinedEventPage } from "../model/useJoinedEventPage";
import { ChatIcon } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

export const JoinedEventPage = () => {
  const { t, i18n } = useTranslation(["event", "common"]);
  const { tab, event, forms, handleTabChange } = useJoinedEventPage();

  const localizedTabs = getEventJoinedMainTabs(t);

  return (
    <div className={styles.wrapperJoinedEventPage}>
      <motion.div
        className={styles.eventJoinedPageHeader}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.headerEventInfo}>
          <div className={styles.mainEventData}>
            <div className={styles.eventOrganizationInfo}>
              <div className={styles.titleHeader}>
                <h1>{event?.title}</h1>
                <div className={styles.eventJoinedMetaInfo}>
                  <span className={styles.metaChipJoinedEvent}>
                    {t("event:labels.joinedChip")}
                  </span>
                  {event?.recurrence && (
                    <span className={styles.reccurenceInfo}>
                      <Reccurence className={styles.reccurenceIcon} />
                      <h1>{event.recurrence}</h1>
                    </span>
                  )}
                  {event?.endAt && (
                    <span className={`${styles.metaChip} ${styles.calendar}`}>
                      <Calendar className={styles.calendarImg} />
                      <span>
                        {formatDateRange(
                          event.startAt,
                          event.endAt,
                          i18n.language as "en" | "uk",
                        )}
                      </span>
                    </span>
                  )}
                  <span className={`${styles.metaChip} ${styles.roleChip}`}>
                    <RoleIcon className={styles.role} />
                    <span>{event.currentUserRole.name}</span>
                  </span>
                </div>
              </div>
              <div className={styles.chatOrganizationBlock}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <LinkButtonWrapper
                    to="/organizations/$id"
                    params={{ id: event.organization?.id }}
                    className={styles.organizationInfo}
                  >
                    <img
                      src={event?.organization?.logoUrl ?? undefined}
                      alt="organization-image"
                    />
                    <p>{event?.organization?.name}</p>
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
                    <h1>{t("event:labels.chat")}</h1>
                  </LinkButtonWrapper>
                </motion.div>
              </div>
            </div>
            {event?.project && (
              <div className={styles.projectPill}>
                <h1>{t("event:labels.project")}</h1>
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
        <div className={styles.statsJoinedEventInfo}>
          <div className={styles.headerLevelBar}>
            <span className={styles.current}>
              {t("common:level.current", { level: event.progress.level ?? 0 })}
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
            <span className={styles.label}>{t("common:level.next")}</span>
            <span className={styles.next}>
              {t("common:level.current", {
                level:
                  event.progress?.level == null ? 1 : event.progress.level + 1,
              })}
            </span>
          </div>
        </div>
        <div className={styles.eventJoinedFooterContent}>
          <ReadMoreButton
            collapsedHeight={90}
            className={styles.readMoreButtonContainer}
            classNameButton={styles.readMoreButtonJoinedEvent}
          >
            <p>{event?.description}</p>
          </ReadMoreButton>
          {event?.id && event.hasPendingLeaveRequest && (
            <p className={styles.pendingRequest}>
              {t("event:states.pendingLeave")}
            </p>
          )}

          {event?.id && !event.hasPendingLeaveRequest && (
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
          tabs={localizedTabs}
          activeValue={tab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleJoinedEventButton}
          activeButtonClassName={styles.toggleJoinedEventButtonActive}
          className={styles.toggleJoinedEvent}
          pillClassName={styles.toggleJoinedEventPill}
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

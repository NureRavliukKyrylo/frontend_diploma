import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./EventPage.module.scss";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProgressBar, Toggle } from "@shared/ui";
import { LinkButtonWrapper, ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/project";
import { AnimatePresence, motion } from "framer-motion";
import { useMapUserLocation } from "@features/map";
import { eventQuery, type EventMode } from "@entities/event";
import { formatDateToText } from "@shared/libs/date";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { getEventMainForms } from "../config/eventMainForms";
import { eventMainTabs } from "../config/eventMainTabs";
import { Arrow } from "@shared/assets/icons/actions";
import { getPolicyStatusConfig } from "@shared/libs/entity";

export const EventPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/$id/" });
  const search = useSearch({ from: "/_masterLayout/events/$id/" });
  const { data: event } = useSuspenseQuery(eventQuery.id(id));
  const { user, coordinates: userLocation } = useMapUserLocation();
  const navigate = useNavigate({ from: "/events/$id/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: EventMode) => {
    navigate({ params: { id }, search: { tab }, resetScroll: false });
  };

  const policyConfig = event?.joinPolicy
    ? getPolicyStatusConfig(event.joinPolicy)
    : null;

  const forms = getEventMainForms({
    event,
    userLocation,
    userId: user?.id,
  });

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
                  src={event?.organization?.logoUrl}
                  alt="organization-image"
                />
                <p>{event?.organization?.name}</p>
              </div>
            </div>
            {event?.project && (
              <div className={styles.projectPill}>
                <h1>PROJECT</h1>
                <LinkButtonWrapper
                  to="/projects/$id"
                  params={{ id: event.project?.id }}
                  className={styles.goToProject}
                >
                  <img src={Arrow} alt="arrow" />
                </LinkButtonWrapper>
              </div>
            )}
          </div>
        </div>
        <div className={styles.statsEventInfo}>
          <div className={styles.levelEventInfo}>
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
          <div className={styles.ratingEventInfo}>
            <h1>4.5</h1>
            <p>(120 votes)</p>
          </div>
        </div>
        <div className={styles.eventFooterContent}>
          <ReadMoreButton collapsedHeight={90}>
            <p>{event?.description}</p>
          </ReadMoreButton>
          <div className={styles.joinEventBlockButton}>
            {event?.id && <JoinProjectButton projectId={event.id} />}
          </div>
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={eventMainTabs}
          activeValue={activeTab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleEventButton}
          activeButtonClassName={styles.toggleEventButtonActive}
          className={styles.toggleEvent}
          pillClassName={styles.toggleEventPill}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {forms[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

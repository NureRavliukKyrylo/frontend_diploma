import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import styles from "./EventPage.module.scss";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ProgressBar, Toggle } from "@shared/ui";
import { ReadMoreButton } from "@shared/ui/buttons";
import { JoinProjectButton } from "@features/project";
import { AnimatePresence, motion } from "framer-motion";
import { useMapUserLocation } from "@features/map";
import { eventQuery, type EventMode } from "@entities/event";
import { formatDateToText } from "@shared/libs/date";
import { profileQuery, useUserStore } from "@entities/user/profile";
import { Calendar } from "@shared/assets/icons/info";
import { getEventMainForms } from "../config/eventMainForms";
import { eventMainTabs } from "../config/eventMainTabs";

export const ProjectPage = () => {
  const { id } = useParams({ from: "/_masterLayout/events/$id/" });
  const search = useSearch({ from: "/_masterLayout/events/$id/" });
  const { data: event } = useSuspenseQuery(eventQuery.id(id));
  const { coordinates: userLocation } = useMapUserLocation();
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const { data: user } = useQuery({
    ...profileQuery.all(),
    enabled: !!isAuthenticated,
  });
  const navigate = useNavigate({ from: "/events/$id/" });

  const activeTab = search.tab;
  const handleTabChange = (tab: EventMode) => {
    navigate({ params: { id }, search: { tab }, resetScroll: false });
  };
  const forms = getEventMainForms({
    event,
    userLocation,
    userId: user?.id,
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
              <h1>{event?.title}</h1>
              <div className={styles.projectMetaInfo}>
                <span className={styles.metaChipProject}>Project</span>
                {event?.endAt && (
                  <span className={`${styles.metaChip} ${styles.calendar}`}>
                    <Calendar className={styles.calendarImg} />
                    <span>{formatDateToText(event.endAt)}</span>
                  </span>
                )}
                {event?.joinPolicy && (
                  <span
                    className={`${styles.metaChip} ${
                      event.joinPolicy === "open"
                        ? styles.metaChipOpen
                        : styles.metaChipApproval
                    }`}
                  >
                    <span>
                      {event.joinPolicy === "open"
                        ? "Open to join"
                        : "Approval required"}
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
        </div>
        <div className={styles.statsProjectInfo}>
          <div className={styles.levelProjectInfo}>
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
          <div className={styles.ratingProjectInfo}>
            <h1>4.5</h1>
            <p>(120 votes)</p>
          </div>
        </div>
        <div className={styles.projectFooterContent}>
          <ReadMoreButton collapsedHeight={90}>
            <p>{event?.description}</p>
          </ReadMoreButton>
          <div className={styles.joinProjectBlockButton}>
            {event?.id && <JoinProjectButton projectId={event.id} />}
          </div>
        </div>
      </motion.div>
      <div className={styles.toggleWrapper}>
        <Toggle
          tabs={eventMainTabs}
          activeValue={activeTab}
          onChange={handleTabChange}
          buttonClassName={styles.toggleProjectButton}
          activeButtonClassName={styles.toggleProjectButtonActive}
          className={styles.toggleProject}
          pillClassName={styles.toggleProjectPill}
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

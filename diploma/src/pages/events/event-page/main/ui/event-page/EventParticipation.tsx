import { useTranslation } from "react-i18next";
import type { Event } from "@entities/event";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReadMoreButton } from "@shared/ui/buttons";
import styles from "../EventPage.module.scss";

interface EventParticipationProps {
  event: Event;
}

export const EventParticipation = ({ event }: EventParticipationProps) => {
  const { t } = useTranslation(["event"]);

  return (
    <div className={styles.eventFooterContent}>
      <ReadMoreButton
        collapsedHeight={90}
        className={styles.readMoreButtonContainer}
        classNameButton={styles.readMoreButtonEvent}
      >
        <p>{event.description}</p>
      </ReadMoreButton>
      {event.id && event.hasPendingLeaveRequest ? (
        <p className={`${styles.pendingRequest} ${styles.leave}`}>
          {t("event:states.pendingLeave")}
        </p>
      ) : null}

      {event.id && event.hasPendingJoinRequest ? (
        <p className={styles.pendingRequest}>
          {t("event:states.pendingJoin")}
        </p>
      ) : null}

      {event.id && !event.hasPendingJoinRequest && !event.hasPendingLeaveRequest ? (
        <div className={styles.joinEventBlockButton}>
          {event.isJoined ? (
            <ParticipationLeaveButton
              entityId={event.id}
              entityType="event"
              entityName={event.title}
            />
          ) : (
            <ParticipationJoinButton entityId={event.id} entityType="event" />
          )}
        </div>
      ) : null}
    </div>
  );
};

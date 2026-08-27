import { AvatarGroup } from "@shared/ui";
import type { Event } from "../../../model";
import styles from "./EventCard.module.scss";
import { memberPreviewToAvatar } from "@entities/user";
import { EventCardBase } from "../base-card/EventCardBase";
import { EventDefaultBottomContent } from "../base-card/EventDefaultBottomContent";
import { Comment, Reccurence } from "@shared/assets/icons/info";
import { useTranslation } from "react-i18next";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { t } = useTranslation(["event"]);

  return (
    <div className={styles.eventCardWrapper}>
      <EventCardBase
        event={event}
        bottomContent={
          <div className={styles.eventCardFooter}>
            <EventDefaultBottomContent event={event} />
            <div className={styles.footerCard}>
              {event.memberPreviews?.length ? (
                <AvatarGroup
                  className={styles.avatarsGroup}
                  avatarClassName={styles.avatarVolunteer}
                  remainingClassName={styles.remainingAvatarItem}
                  avatars={event.memberPreviews.map(memberPreviewToAvatar)}
                  maxItems={3}
                />
              ) : (
                <p className={styles.noMembers}>
                  {t("event:cards.noVolunteers")}
                </p>
              )}
              <div className={styles.endContent}>
                {event.recurrence && (
                  <span className={styles.reccurenceInfo}>
                    <Reccurence className={styles.reccurenceIcon} />
                    <h1>
                      {t(`event:modes.${event.recurrence.toLowerCase()}`, {
                        defaultValue: event.recurrence,
                      })}
                    </h1>
                  </span>
                )}
                <span className={styles.totalFeedbacksInfo}>
                  <Comment className={styles.feedbackIcon} />
                  <h1>{event.rating.totalVotes}</h1>
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

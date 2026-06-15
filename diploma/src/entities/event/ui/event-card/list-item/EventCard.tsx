import { AvatarGroup } from "@shared/ui";
import type { Event } from "../../../model";
import styles from "./EventCard.module.scss";
import { memberPreviewToAvatar } from "@entities/user";
import { EventCardBase } from "../base-card/EventCardBase";
import { EventDefaultBottomContent } from "../base-card/EventDefaultBottomContent";
import { Comment, Reccurence } from "@shared/assets/icons/info";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => (
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
              <p className={styles.noMembers}>No volunteers joined yet</p>
            )}
            <div className={styles.endContent}>
              {event.recurrence && (
                <span className={styles.reccurenceInfo}>
                  <Reccurence className={styles.reccurenceIcon} />
                  <h1>{event.recurrence}</h1>
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

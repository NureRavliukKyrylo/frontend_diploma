import { Calendar, MapIcon, TimeIcon } from "@shared/assets/icons/info";
import { AvatarGroup } from "@shared/ui";
import styles from "./EventCalendarDetail.module.scss";
import type { Event } from "@entities/event/model";
import { formatDateToText, formatHourTime } from "@shared/libs/date";
import { memberPreviewToAvatar } from "@entities/user";
import { useTranslation } from "react-i18next";

interface EventCalendarDetailProps {
  event: Event;
}

export const EventCalendarDetail = ({ event }: EventCalendarDetailProps) => {
  const { t, i18n } = useTranslation(["event"]);

  return (
    <>
      <div className={styles.middleContent}>
        <div className={styles.baseInfo}>
          <div className={styles.subBaseInfoBlock}>
            <Calendar />
            <div className={styles.calendarDivider} />
            <span className={styles.calendarInfo}>
              {formatDateToText(event.startAt, i18n.language as "en" | "ua")}
            </span>
          </div>
          <div className={styles.subBaseInfoBlock}>
            <MapIcon className={styles.mapIcon} />
            <div className={styles.divider} />
            <span className={styles.info}>{event.locationInfo.address}</span>
          </div>
          <div className={styles.subBaseInfoBlock}>
            <TimeIcon className={styles.timeIcon} />
            <div className={styles.divider} />
            <span className={styles.info}>
              {formatHourTime(event.startAt) ?? t("event:cards.allTime")}
            </span>
          </div>
        </div>
        <div className={styles.descriptionInfo}>
          <h1>{t("event:cards.about")}</h1>
          <p>{event.description}</p>
        </div>
        <div className={styles.participationsInfo}>
          <h1>{t("event:cards.participants")}</h1>
          {event.memberPreviews?.length ? (
            <AvatarGroup
              className={styles.avatarsGroup}
              avatarClassName={styles.avatarVolunteer}
              remainingClassName={styles.remainingAvatarItem}
              avatars={event.memberPreviews.map(memberPreviewToAvatar)}
              maxItems={3}
            />
          ) : (
            <p className={styles.noMembers}>{t("event:cards.noVolunteers")}</p>
          )}
        </div>
      </div>
    </>
  );
};

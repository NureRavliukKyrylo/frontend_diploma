import { Calendar, TimeIcon } from "@shared/assets/icons/info";
import { AvatarGroup } from "@shared/ui";
import styles from "./TaskCalendarDetail.module.scss";
import { formatDateToText, formatHourTime } from "@shared/libs/date";
import type { Task } from "@entities/task/model";
import { memberPreviewToAvatar } from "@entities/user";
import { useTranslation } from "react-i18next";

interface TaskCalendarDetailProps {
  task: Task;
}

export const TaskCalendarDetail = ({ task }: TaskCalendarDetailProps) => {
  const { t, i18n } = useTranslation(["task"]);

  return (
    <>
      <div className={styles.middleContent}>
        <div className={styles.baseInfo}>
          <div className={styles.subBaseInfoBlock}>
            <Calendar />
            <div className={styles.calendarDivider} />
            <span className={styles.calendarInfo}>
              {formatDateToText(task.startAt, i18n.language as "en" | "uk")}
            </span>
          </div>
          <div className={styles.subBaseInfoBlock}>
            <TimeIcon className={styles.timeIcon} />
            <div className={styles.divider} />
            <span className={styles.info}>
              {formatHourTime(task.startAt, i18n.language as "en" | "uk") ??
                t("task:cards.allTime")}
            </span>
          </div>
        </div>
        <div className={styles.descriptionInfo}>
          <h1>{t("task:cards.about")}</h1>
          <p>{task.description}</p>
        </div>
        <div className={styles.participationsInfo}>
          <h1>{t("task:cards.participants")}</h1>
          {task.memberPreviews?.length ? (
            <AvatarGroup
              className={styles.avatarsGroup}
              avatarClassName={styles.avatarVolunteer}
              remainingClassName={styles.remainingAvatarItem}
              avatars={task.memberPreviews.map(memberPreviewToAvatar)}
              maxItems={3}
            />
          ) : (
            <p className={styles.noMembers}>{t("task:cards.noVolunteers")}</p>
          )}
        </div>
      </div>
    </>
  );
};

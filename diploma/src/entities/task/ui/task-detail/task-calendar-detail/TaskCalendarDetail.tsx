import { Calendar, TimeIcon } from "@shared/assets/icons/info";
import { AvatarGroup } from "@shared/ui";
import styles from "./TaskCalendarDetail.module.scss";
import { formatDateToText } from "@shared/libs/date";
import type { Task } from "@entities/task/model";
import { memberPreviewToAvatar } from "@entities/user";

interface TaskCalendarDetailProps {
  task: Task;
}

export const TaskCalendarDetail = ({ task }: TaskCalendarDetailProps) => (
  <>
    <div className={styles.middleContent}>
      <div className={styles.baseInfo}>
        <div className={styles.subBaseInfoBlock}>
          <Calendar />
          <div className={styles.divider} />
          <span className={styles.info}>{formatDateToText(task.startAt)}</span>
        </div>
        <div className={styles.subBaseInfoBlock}>
          <TimeIcon className={styles.timeIcon} />
          <div className={styles.divider} />
          <span className={styles.info}>
            {formatDateToText(task.startAt) ?? "All time"}
          </span>
        </div>
      </div>
      <div className={styles.descriptionInfo}>
        <h1>About this event</h1>
        <p>{task.description}</p>
      </div>
      <div className={styles.participationsInfo}>
        <h1>Participants</h1>
        {task.memberPreviews?.length ? (
          <AvatarGroup
            className={styles.avatarsGroup}
            avatarClassName={styles.avatarVolunteer}
            remainingClassName={styles.remainingAvatarItem}
            avatars={task.memberPreviews.map(memberPreviewToAvatar)}
            maxItems={3}
          />
        ) : (
          <p className={styles.noMembers}>No volunteers joined yet</p>
        )}
      </div>
    </div>
  </>
);

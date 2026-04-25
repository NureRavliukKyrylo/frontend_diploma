import type { Task } from "@entities/task/model";
import styles from "./TaskBoardItem.module.scss";
import { Calendar } from "@shared/assets/icons/info";
import { formatDateToText } from "@shared/libs/date";
import { AvatarGroup } from "@shared/ui";
import { memberPreviewToAvatar } from "@entities/user";
import { Comment } from "@shared/assets/icons/info";

interface TaskBoardItemProps {
  task: Task;
}

export const TaskBoardItem = ({ task }: TaskBoardItemProps) => {
  return (
    <div className={styles.taskBoardItemWrapper}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <div className={styles.deadlineBlock}>
        <Calendar className={styles.calendarTask} />
        <span>{formatDateToText(task.endAt)}</span>
      </div>
      <div className={styles.dividerLine}></div>
      <div className={styles.footerContent}>
        {task.memberPreviews?.length ? (
          <AvatarGroup
            className={styles.avatarsGroup}
            avatarClassName={styles.avatarVolunteer}
            remainingClassName={styles.remainingAvatarItem}
            avatars={task.memberPreviews.map(memberPreviewToAvatar)}
            maxItems={6}
          />
        ) : (
          <p className={styles.noMembers}>No volunteers joined yet</p>
        )}
        <span className={styles.totalFeedbacksInfo}>
          <Comment className={styles.feedbackIcon} />
          <h1>{task.rating.totalVotes}</h1>
        </span>
      </div>
    </div>
  );
};

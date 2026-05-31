import type { Task } from "@entities/task/model";
import styles from "./TaskBoardListItem.module.scss";
import { AvatarGroup } from "@shared/ui";
import { memberPreviewToAvatar } from "@entities/user";
import { Comment } from "@shared/assets/icons/info";
import { TaskBoardItemBase } from "../base/TaskBoardItemBase";

interface TaskBoardListItemProps {
  task: Task;
}

export const TaskBoardListItem = ({ task }: TaskBoardListItemProps) => (
  <div className={styles.taskBoardItemwrapper}>
    <TaskBoardItemBase
      task={task}
      footerContent={
        <>
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
        </>
      }
    />
  </div>
);

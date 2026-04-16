import { AvatarGroup } from "@shared/ui";
import { memberPreviewToAvatar } from "@entities/user";
import type { Task } from "../../../model";
import { TaskCardBase } from "../base/TaskCardBase";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => (
  <div className={styles.taskCardWrapper}>
    <TaskCardBase
      task={task}
      endContent={
        <AvatarGroup
          className={styles.avatarsGroup}
          avatarClassName={styles.avatarVolunteer}
          remainingClassName={styles.remainingAvatarItem}
          avatars={task.memberPreviews?.map(memberPreviewToAvatar) ?? []}
          maxItems={3}
        />
      }
    />
  </div>
);

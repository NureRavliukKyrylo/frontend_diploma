import { AvatarGroup } from "@shared/ui";
import { memberPreviewToAvatar } from "@entities/user";
import type { Task } from "../../../model";
import { TaskCardBase } from "../base/TaskCardBase";
import styles from "./TaskCard.module.scss";
import { useTranslation } from "react-i18next";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <div className={styles.taskCardWrapper}>
      <TaskCardBase
        task={task}
        startContent={
          task.memberPreviews?.length ? (
            <AvatarGroup
              className={styles.avatarsGroup}
              avatarClassName={styles.avatarVolunteer}
              remainingClassName={styles.remainingAvatarItem}
              avatars={task.memberPreviews.map(memberPreviewToAvatar)}
              maxItems={3}
            />
          ) : (
            <p className={styles.noMembers}>{t("task:cards.noVolunteers")}</p>
          )
        }
      />
    </div>
  );
};

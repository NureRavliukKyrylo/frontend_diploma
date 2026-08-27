import { useTranslation } from "react-i18next";
import type { Task } from "@entities/task";
import {
  ParticipationJoinButton,
  ParticipationLeaveButton,
} from "@features/participation";
import { ReadMoreButton } from "@shared/ui/buttons";
import styles from "./TaskParticipationBlock.module.scss";

interface TaskParticipationBlockProps {
  task: Task;
}

export const TaskParticipationBlock = ({
  task,
}: TaskParticipationBlockProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <div className={styles.taskFooterContent}>
      <ReadMoreButton collapsedHeight={90}>
        <p>{task.description}</p>
      </ReadMoreButton>
      {task.id && task.hasPendingLeaveRequest ? (
        <p className={`${styles.pendingRequest} ${styles.leave}`}>
          {t("task:states.pendingLeave")}
        </p>
      ) : null}

      {task.id && task.hasPendingJoinRequest ? (
        <p className={styles.pendingRequest}>{t("task:states.pendingJoin")}</p>
      ) : null}

      {task.id &&
      !task.hasPendingJoinRequest &&
      !task.hasPendingLeaveRequest ? (
        <div className={styles.joinTaskBlockButton}>
          {task.isJoined && (
            <ParticipationLeaveButton
              entityId={task.id}
              entityType="task"
              entityName={task.title}
            />
          )}
          {task.canApply && (
            <ParticipationJoinButton entityId={task.id} entityType="task" />
          )}
        </div>
      ) : null}
    </div>
  );
};

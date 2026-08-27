import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar } from "@shared/assets/icons/info";
import type { OrganizationTaskListItem } from "../lib/helpers";
import styles from "./TaskListItem.module.scss";

interface TaskListItemProps {
  task: OrganizationTaskListItem;
  index: number;
}

const statusLabelMap = {
  Pending: "details.tasks.status.pending",
  InProgress: "details.tasks.status.inProgress",
  Completed: "details.tasks.status.completed",
  Cancelled: "details.tasks.status.cancelled",
} as const;

const statusClassNameMap = {
  Pending: styles.taskStatusBadgePending,
  InProgress: styles.taskStatusBadgeInProgress,
  Completed: styles.taskStatusBadgeCompleted,
  Cancelled: styles.taskStatusBadgeCancelled,
} as const;

const taskRowClassNameMap = {
  Pending: styles.taskRowPending,
  InProgress: styles.taskRowInProgress,
  Completed: styles.taskRowCompleted,
  Cancelled: styles.taskRowCancelled,
} as const;

export const TaskListItem = ({
  task,
  index,
}: TaskListItemProps) => {
  const { t } = useTranslation("organizations");
  return (
    <motion.article
      className={`${styles.taskRow} ${taskRowClassNameMap[task.status]}`}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.34,
        delay: 0.05 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <div className={styles.taskIntro}>
            <span
              className={`${styles.taskStatusBadge} ${statusClassNameMap[task.status]}`}
            >
              {t(statusLabelMap[task.status])}
            </span>
            <h3>{task.title}</h3>
          </div>

          <button
            type="button"
            className={styles.taskMenuButton}
            aria-label={t("details.tasks.moreActions", { title: task.title })}
          >
            ...
          </button>
        </div>

        <p className={styles.taskDescription}>{task.description}</p>
      </div>

      <div className={styles.taskMetaPanel}>
        <div className={styles.taskDueBlock}>
          <Calendar aria-hidden="true" className={styles.taskMetaIcon} />
          <div className={styles.taskMetaCopy}>
            <span>{t("details.tasks.dueDate")}</span>
            <strong>{task.dueDateLabel}</strong>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

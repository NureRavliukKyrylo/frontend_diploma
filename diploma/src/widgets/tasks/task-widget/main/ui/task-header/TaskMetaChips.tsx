import { useTranslation } from "react-i18next";
import type { Task } from "@entities/task";
import { Calendar, Reccurence } from "@shared/assets/icons/info";
import { formatDateRange } from "@shared/libs/date";
import type { useTaskWidget } from "../../model/useTaskWidget";
import styles from "./TaskMetaChips.module.scss";

interface TaskMetaChipsProps {
  task: Task;
  policyConfig: ReturnType<typeof useTaskWidget>["policyConfig"];
}

export const TaskMetaChips = ({ task, policyConfig }: TaskMetaChipsProps) => {
  const { t, i18n } = useTranslation(["task"]);

  return (
    <div className={styles.taskMetaInfo}>
      <span className={styles.metaChipTask}>{t("task:labels.task")}</span>
      {task.recurrence ? (
        <span className={styles.reccurenceInfo}>
          <Reccurence className={styles.reccurenceIcon} />
          <h1>
            {t(`task:modes.${task.recurrence}`, {
              defaultValue: task.recurrence,
            })}
          </h1>
        </span>
      ) : null}
      {task.endAt ? (
        <span className={`${styles.metaChip} ${styles.calendar}`}>
          <Calendar className={styles.calendarImg} />
          <span>
            {formatDateRange(
              task.startAt,
              task.endAt,
              i18n.language as "en" | "ua",
            )}
          </span>
        </span>
      ) : null}
      {policyConfig ? (
        <span
          className={`${styles.metaChip} ${styles.policy}`}
          style={{ boxShadow: policyConfig.boxShadow }}
        >
          <span
            style={{
              background: policyConfig.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {policyConfig.label}
          </span>
        </span>
      ) : null}
    </div>
  );
};

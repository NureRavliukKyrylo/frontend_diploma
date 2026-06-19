import { useTranslation } from "react-i18next";
import type { Task } from "@entities/task";
import styles from "./TaskOrganizationSummary.module.scss";

interface TaskOrganizationSummaryProps {
  task: Task;
}

export const TaskOrganizationSummary = ({
  task,
}: TaskOrganizationSummaryProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <div className={styles.rightBlockInfo}>
      <div className={styles.organizationInfo}>
        <img
          src={task.organization?.logoUrl ?? undefined}
          alt="organization-image"
        />
        <p>{task.organization?.name}</p>
      </div>
      <div className={styles.ratingTaskInfo}>
        <h1>{task.rating.value}</h1>
        <p>{t("task:labels.votes", { count: task.rating.totalVotes })}</p>
      </div>
    </div>
  );
};

import { useTranslation } from "react-i18next";
import type { Task } from "@entities/task";
import styles from "./TaskOrganizationSummary.module.scss";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";

interface TaskOrganizationSummaryProps {
  task: Task;
}

export const TaskOrganizationSummary = ({
  task,
}: TaskOrganizationSummaryProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <div className={styles.rightBlockInfo}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <LinkButtonWrapper
          to="/organizations/$id"
          params={{ id: task.organization.id }}
          className={styles.organizationInfo}
        >
          <img
            src={task.organization?.logoUrl ?? undefined}
            alt="organization-image"
          />
          <p>{task.organization?.name}</p>
        </LinkButtonWrapper>
      </motion.div>
      <div className={styles.ratingTaskInfo}>
        <h1>{task.rating.value}</h1>
        <p>({t("task:labels.votes", { count: task.rating.totalVotes })})</p>
      </div>
    </div>
  );
};

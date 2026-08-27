import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { Task } from "@entities/task";
import { Arrow } from "@shared/assets/icons/actions";
import { LinkButtonWrapper } from "@shared/ui/buttons";
import styles from "./TaskRelatedActivities.module.scss";

interface TaskRelatedActivitiesProps {
  task: Task;
}

export const TaskRelatedActivities = ({
  task,
}: TaskRelatedActivitiesProps) => {
  const { t } = useTranslation(["task"]);

  return (
    <div className={styles.relatedActivities}>
      {task.project ? (
        <div className={styles.activityPill}>
          <h1>{t("task:labels.project")}</h1>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <LinkButtonWrapper
              to="/projects/$id"
              params={{ id: task.project.id }}
              className={styles.goToActivity}
            >
              <Arrow className={styles.goToActivityLink} />
            </LinkButtonWrapper>
          </motion.div>
        </div>
      ) : null}
      {task.event ? (
        <div className={styles.activityPill}>
          <h1>{t("task:labels.event")}</h1>
          <motion.div
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <LinkButtonWrapper
              to="/events/$id"
              params={{ id: task.event.id }}
              className={styles.goToActivity}
            >
              <Arrow className={styles.goToActivityLink} />
            </LinkButtonWrapper>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
};

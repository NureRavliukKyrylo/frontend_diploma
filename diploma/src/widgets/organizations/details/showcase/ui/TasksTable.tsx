import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Avatar } from "@shared/ui";
import { OrganizationDetailsEmptyState } from "../../shared/empty-state/ui/EmptyState";
import type { ProjectTaskRowData } from "../lib/helpers";
import {
  rowVariants,
  rowsContainerVariants,
  surfaceVariants,
} from "../lib/animation";
import styles from "./TasksTable.module.scss";

interface OrganizationTasksTableProps {
  taskRows: ProjectTaskRowData[];
  isLoading: boolean;
}

const statusLabelMap = {
  Pending: "details.showcase.status.pending",
  InProgress: "details.showcase.status.inProgress",
  Completed: "details.showcase.status.completed",
  Cancelled: "details.showcase.status.cancelled",
} as const;

export const OrganizationTasksTable = ({
  taskRows,
  isLoading,
}: OrganizationTasksTableProps) => {
  const { t } = useTranslation("organizations");
  return (
    <div id="organization-tasks-section" className={styles.tasksBlock}>
      <motion.div className={styles.tasksSurface} variants={surfaceVariants}>
        <div className={styles.tasksHeading}>
          <h3>{t("details.showcase.tasks")}</h3>
        </div>

        {isLoading ? (
          <div className={styles.tasksLoadingState}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={styles.taskRowSkeleton} />
            ))}
          </div>
        ) : taskRows.length > 0 ? (
          <>
            <div className={styles.tasksHeader}>
              <span>{t("details.showcase.task")}</span>
              <span>{t("details.showcase.context")}</span>
              <span>{t("details.showcase.assignee")}</span>
              <span>{t("details.showcase.dueDate")}</span>
              <span>{t("details.showcase.statusLabel")}</span>
            </div>

            <motion.div className={styles.tasksRows} variants={rowsContainerVariants}>
              {taskRows.map((task) => (
                <motion.div key={task.id} className={styles.taskRow} variants={rowVariants}>
                  <span className={styles.taskTitle}>{task.task}</span>
                  <p className={styles.taskDescription}>{task.description}</p>

                  <div className={styles.assignees}>
                    {task.assignees.length > 0 ? (
                      task.assignees.map((assignee, index) => (
                        <span
                          key={`${task.id}-${assignee.name ?? assignee.src ?? index}`}
                          className={styles.assigneeItem}
                          style={{ zIndex: task.assignees.length - index + 1 }}
                          title={
                            assignee.name ?? t("details.showcase.teamMember")
                          }
                        >
                          <Avatar
                            src={assignee.src ?? undefined}
                            fallback={assignee.name}
                            variant={assignee.src ? "default" : "initials"}
                            className={styles.assigneeAvatar}
                            initialsClassName={styles.assigneeInitials}
                          />
                        </span>
                      ))
                    ) : (
                      <span className={styles.unassignedLabel}>
                        {t("details.showcase.unassigned")}
                      </span>
                    )}
                  </div>

                  <span className={styles.dueDate}>{task.dueDate}</span>

                  <span
                    className={`${styles.statusPill} ${styles[`status${task.status}`]}`}
                  >
                    {t(statusLabelMap[task.status])}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <div className={styles.tasksEmptyState}>
            <OrganizationDetailsEmptyState />
          </div>
        )}
      </motion.div>
    </div>
  );
};

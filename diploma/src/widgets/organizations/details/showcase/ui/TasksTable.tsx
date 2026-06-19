import { motion } from "framer-motion";
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
  Pending: "Pending",
  InProgress: "In progress",
  Completed: "Completed",
  Cancelled: "Cancelled",
} as const;

export const OrganizationTasksTable = ({
  taskRows,
  isLoading,
}: OrganizationTasksTableProps) => {
  return (
    <div id="organization-tasks-section" className={styles.tasksBlock}>
      <motion.div className={styles.tasksSurface} variants={surfaceVariants}>
        <div className={styles.tasksHeading}>
          <h3>Tasks</h3>
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
              <span>Task</span>
              <span>Context</span>
              <span>Assignee</span>
              <span>Due date</span>
              <span>Status</span>
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
                          title={assignee.name ?? "Team member"}
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
                      <span className={styles.unassignedLabel}>Unassigned</span>
                    )}
                  </div>

                  <span className={styles.dueDate}>{task.dueDate}</span>

                  <span
                    className={`${styles.statusPill} ${styles[`status${task.status}`]}`}
                  >
                    {statusLabelMap[task.status]}
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

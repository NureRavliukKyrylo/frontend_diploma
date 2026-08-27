import { motion } from "framer-motion";
import type { Task } from "@entities/task";
import type { useTaskWidget } from "../../model/useTaskWidget";
import { TaskHeaderActions } from "./TaskHeaderActions";
import { TaskMetaChips } from "./TaskMetaChips";
import { TaskOrganizationSummary } from "./TaskOrganizationSummary";
import { TaskParticipationBlock } from "./TaskParticipationBlock";
import { TaskRelatedActivities } from "./TaskRelatedActivities";
import styles from "./TaskWidgetHeader.module.scss";

interface TaskWidgetHeaderProps {
  task: Task;
  statusConfig: ReturnType<typeof useTaskWidget>["statusConfig"];
  policyConfig: ReturnType<typeof useTaskWidget>["policyConfig"];
  showEditAction: boolean;
  onEdit: () => void;
}

export const TaskWidgetHeader = ({
  task,
  statusConfig,
  policyConfig,
  showEditAction,
  onEdit,
}: TaskWidgetHeaderProps) => (
  <motion.div
    className={styles.taskWidgetHeader}
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className={styles.headerTaskInfo}>
      <TaskHeaderActions
        task={task}
        showEditAction={showEditAction}
        onEdit={onEdit}
      />
      <div
        className={styles.taskStatus}
        style={{
          backgroundColor: statusConfig?.bg,
          color: statusConfig?.color,
          boxShadow: `0px 5px 15px ${statusConfig?.shadow}`,
        }}
      >
        {statusConfig?.label}
      </div>
      <div className={styles.mainTaskData}>
        <div className={styles.taskOrganizationInfo}>
          <div className={styles.titleHeader}>
            <h1>{task.title}</h1>
            <TaskMetaChips task={task} policyConfig={policyConfig} />
          </div>
          <TaskOrganizationSummary task={task} />
        </div>

        <TaskRelatedActivities task={task} />
      </div>
    </div>

    <TaskParticipationBlock task={task} />
  </motion.div>
);

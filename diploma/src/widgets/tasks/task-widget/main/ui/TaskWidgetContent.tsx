import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import type { TaskMode } from "@entities/task";
import type { TabOption } from "@shared/config/types";
import { Toggle } from "@shared/ui";
import styles from "./TaskWidgetContent.module.scss";

interface TaskWidgetContentProps {
  tabs: TabOption<TaskMode>[];
  taskMode: TaskMode;
  forms: Record<TaskMode, ReactNode> | null;
  onModeChange: (taskMode: TaskMode) => void;
}

export const TaskWidgetContent = ({
  tabs,
  taskMode,
  forms,
  onModeChange,
}: TaskWidgetContentProps) => (
  <div className={styles.contentBlock}>
    <div className={styles.toggleWrapper}>
      <Toggle
        tabs={tabs}
        activeValue={taskMode}
        onChange={onModeChange}
        buttonClassName={styles.toggleTaskButton}
        activeButtonClassName={styles.toggleTaskButtonActive}
        className={styles.toggleTask}
        pillClassName={styles.toggleTaskPill}
      />
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={taskMode}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {forms?.[taskMode]}
      </motion.div>
    </AnimatePresence>
  </div>
);

import { AnimatePresence, motion } from "framer-motion";
import type { Task, TaskMode } from "@entities/task";
import { useTranslation } from "react-i18next";
import { useTaskFabActions } from "./model/useTaskFabActions";
import { TaskFabActionStack } from "./ui/TaskFabActionStack";
import { TaskFabMainButton } from "./ui/TaskFabMainButton";
import orgFabStyles from "@widgets/organizations/details/ui/OrganizationFab/OrganizationFab.module.scss";
import styles from "./TaskFab.module.scss";

interface TaskFabProps {
  task: Task;
  activeMode: TaskMode;
  onModeChange: (mode: TaskMode) => void;
}

export const TaskFab = ({ task, activeMode, onModeChange }: TaskFabProps) => {
  const { t } = useTranslation(["task"]);
  const model = useTaskFabActions({ task, activeMode, onModeChange });

  if (!model.isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {model.isOpen ? (
          <motion.button
            type="button"
            className={`${orgFabStyles.backdrop} ${styles.taskBackdrop}`}
            aria-label={t("fab.closeActions")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={model.closeMenu}
          />
        ) : null}
      </AnimatePresence>

      <div className={`${orgFabStyles.fabRoot} ${styles.taskFabRoot}`}>
        <AnimatePresence>
          {model.isOpen ? <TaskFabActionStack model={model} /> : null}
        </AnimatePresence>

        <TaskFabMainButton
          isOpen={model.isOpen}
          onClick={() => model.setIsOpen((current) => !current)}
        />
      </div>
    </>
  );
};

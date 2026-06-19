import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { FeedbackSortValues } from "@entities/feedback";
import type { TaskDrawerSearch, TaskMode } from "@entities/task";
import { getHttpErrorInfo } from "@shared/libs/error";
import { getTaskMainTabs } from "../config/taskMainTabs";
import { canManageTask } from "../lib/canManageTask";
import { useTaskWidget } from "../model/useTaskWidget";
import { TaskEditSettings } from "../../settings/ui/TaskEditSettings";
import { TaskWidgetContent } from "./TaskWidgetContent";
import { TaskWidgetHeader } from "./task-header/TaskWidgetHeader";
import { TaskWidgetSkeleton } from "./TaskWidgetSkeleton";
import styles from "./TaskWidget.module.scss";

interface TaskWidgetProps {
  search: TaskDrawerSearch;
  taskId?: string;
  taskMode: TaskMode;
  handleModeChange: (taskMode: TaskMode) => void;
  handleSort: (value: FeedbackSortValues) => void;
  onClose?: () => void;
}

export const TaskWidget = ({
  search,
  handleModeChange,
  taskMode,
  taskId,
  handleSort,
  onClose,
}: TaskWidgetProps) => {
  const { t } = useTranslation(["task", "common"]);
  const [isEditMode, setIsEditMode] = useState(false);
  const { task, isLoading, isError, error, statusConfig, policyConfig, forms } =
    useTaskWidget({ taskId, search, handleSort });
  const localizedTabs = getTaskMainTabs(t);

  useEffect(() => {
    setIsEditMode(false);
  }, [taskId]);

  if (isLoading) return <TaskWidgetSkeleton />;

  if (isError) {
    return (
      <div className={styles.errorState}>
        <p className="errorHttpMessage">{getHttpErrorInfo(error, t)}</p>
        <p className="errorHint">{t("common:errors.errorHint")}</p>
      </div>
    );
  }

  if (isEditMode && task) {
    return (
      <TaskEditSettings
        task={task}
        onExitEdit={() => setIsEditMode(false)}
        onCloseDrawer={onClose}
      />
    );
  }

  if (!task) return null;

  return (
    <div className={styles.wrapperTaskWidget}>
      <TaskWidgetHeader
        task={task}
        statusConfig={statusConfig}
        policyConfig={policyConfig}
        showEditAction={canManageTask(task)}
        onEdit={() => setIsEditMode(true)}
      />
      <TaskWidgetContent
        tabs={localizedTabs}
        taskMode={taskMode}
        forms={forms}
        onModeChange={handleModeChange}
      />
    </div>
  );
};

import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ModerationSubjectType } from "@entities/report";
import type { Task } from "@entities/task";
import { ReportButton } from "@features/moderation";
import styles from "./TaskHeaderActions.module.scss";

interface TaskHeaderActionsProps {
  task: Task;
  showEditAction: boolean;
  onEdit: () => void;
}

export const TaskHeaderActions = ({
  task,
  showEditAction,
  onEdit,
}: TaskHeaderActionsProps) => {
  const { t } = useTranslation(["common"]);

  return (
    <div className={styles.headerActions}>
      {showEditAction ? (
        <button type="button" className={styles.editTaskButton} onClick={onEdit}>
          <Pencil size={15} strokeWidth={2.4} />
          {t("common:actions.edit")}
        </button>
      ) : null}
      <ReportButton
        subjectType={ModerationSubjectType.Task}
        subjectId={task.id}
      />
    </div>
  );
};

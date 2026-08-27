import type { Task } from "@entities/task";
import { useTaskTimeLogsTab } from "../model/useTaskTimeLogsTab";
import type { TaskTimeLogsLabels } from "../model/types";
import { TimeLogDecisionModal } from "./TimeLogDecisionModal";
import { TimeLogsControls } from "./TimeLogsControls";
import { TimeLogsList } from "./TimeLogsList";
import styles from "../../TaskTabs.module.scss";
import type { TaskPermissionContext } from "../../../../lib/canManageTask";

interface TaskTimeLogsTabProps {
  task: Task;
  pageSize?: number;
  labels: TaskTimeLogsLabels;
  permissionContext: TaskPermissionContext;
}

export const TaskTimeLogsTab = ({
  task,
  pageSize = 20,
  labels,
  permissionContext,
}: TaskTimeLogsTabProps) => {
  const page = useTaskTimeLogsTab(
    task,
    pageSize,
    labels,
    permissionContext,
  );
  const controls = (
    <TimeLogsControls
      status={page.status}
      logs={page.allLogs}
      labels={labels}
      isExporting={page.exportMutation.isPending}
      onStatusChange={page.setStatus}
      onExport={() => page.exportMutation.mutate()}
    />
  );

  if (page.logsResult.isPending) {
    return (
      <>
        {controls}
        <div className={styles.statePanel}>{labels.loading}</div>
      </>
    );
  }

  if (page.logsResult.isError) {
    return (
      <>
        {controls}
        <div className={styles.statePanel}>{labels.error}</div>
      </>
    );
  }

  return (
    <>
      {controls}
      <TimeLogsList
        logs={page.logs}
        labels={labels}
        permissions={page.permissions}
        onOpenAction={page.openAction}
      />
      <TimeLogDecisionModal
        activeAction={page.activeAction}
        labels={labels}
        minutes={page.minutes}
        comment={page.comment}
        resolveApprove={page.resolveApprove}
        isLoading={page.actionMutation.isPending}
        onConfirm={() => page.actionMutation.mutate()}
        onCancel={page.closeModal}
        onMinutesChange={page.setMinutes}
        onCommentChange={page.setComment}
        onResolveApproveChange={page.setResolveApprove}
      />
    </>
  );
};

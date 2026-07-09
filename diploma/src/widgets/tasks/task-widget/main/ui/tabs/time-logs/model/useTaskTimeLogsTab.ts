import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveTaskTimeLog,
  exportTaskTimeLogs,
  getTaskTimeLogs,
  managerEditTaskTimeLog,
  rejectTaskTimeLog,
  resolveTaskTimeLog,
  type Task,
  type TaskTimeLogRecord,
} from "@entities/task";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  canApproveTaskTimeLogs,
  canManagerEditTaskTimeLogs,
  canRejectTaskTimeLogs,
  canResolveTaskTimeLogs,
} from "../../../../lib/canManageTask";
import { useMemo, useState } from "react";
import type {
  ActiveTaskLogAction,
  TaskLogAction,
  TaskTimeLogsLabels,
} from "./types";
import type { TaskPermissionContext } from "../../../../lib/canManageTask";

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const matchesStatusFilter = (
  record: TaskTimeLogRecord,
  status: string,
) => {
  if (!status) return true;
  if (status === "Submitted") {
    return (
      record.status === "Submitted" ||
      record.status === "ManagerEditedPendingVolunteerReconfirm"
    );
  }
  if (status === "Approved") {
    return record.status === "Approved" || record.status === "Resolved";
  }
  return record.status === status;
};

export const useTaskTimeLogsTab = (
  task: Task,
  pageSize: number,
  labels: TaskTimeLogsLabels,
  permissionContext: TaskPermissionContext,
) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [activeAction, setActiveAction] = useState<ActiveTaskLogAction | null>(
    null,
  );
  const [comment, setComment] = useState("");
  const [minutes, setMinutes] = useState("");
  const [resolveApprove, setResolveApprove] = useState(true);
  const queryKey = useMemo(
    () => ["task-time-logs", task.id, pageSize],
    [pageSize, task.id],
  );
  const logsResult = useQuery({
    queryKey,
    queryFn: () =>
      getTaskTimeLogs(task.id, {
        Page: 1,
        PageSize: pageSize,
      }),
  });
  const allLogs = useMemo(
    () => logsResult.data?.data ?? [],
    [logsResult.data?.data],
  );
  const logs = useMemo(
    () => allLogs.filter((record) => matchesStatusFilter(record, status)),
    [allLogs, status],
  );
  const actionMutation = useMutation({
    mutationFn: async () => {
      if (!activeAction) return null;
      const logId = activeAction.record.id;

      if (activeAction.type === "manager-edit") {
        return managerEditTaskTimeLog(task.id, logId, {
          managerAdjustedMinutes:
            Number(minutes) || activeAction.record.loggedMinutes || 0,
          managerComment: comment.trim() || undefined,
        });
      }

      if (activeAction.type === "approve") {
        return approveTaskTimeLog(task.id, logId, {
          comment: comment.trim() || undefined,
        });
      }

      if (activeAction.type === "reject") {
        return rejectTaskTimeLog(task.id, logId, {
          comment: comment.trim() || "Rejected",
        });
      }

      return resolveTaskTimeLog(task.id, logId, {
        approveLog: resolveApprove,
        finalApprovedMinutes: resolveApprove
          ? Number(minutes) || activeAction.record.finalApprovedMinutes || null
          : null,
        resolutionComment: comment.trim() || undefined,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["task-time-logs", task.id],
      });
      addToast({ title: labels.notifications.saved, color: "success" });
      setActiveAction(null);
      setComment("");
      setMinutes("");
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.notifications.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });
  const exportMutation = useMutation({
    mutationFn: () => exportTaskTimeLogs(task.id),
    onSuccess: (blob) => {
      downloadBlob(blob, `task-${task.id}-time-logs.csv`);
      addToast({ title: labels.notifications.exported, color: "success" });
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.notifications.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });

  const openAction = (type: TaskLogAction, record: TaskTimeLogRecord) => {
    setActiveAction({ type, record });
    setComment("");
    setResolveApprove(true);
    setMinutes(
      String(
        record.managerAdjustedMinutes ??
          record.finalApprovedMinutes ??
          record.approvedMinutes ??
          record.loggedMinutes ??
          "",
      ),
    );
  };
  const closeModal = () => {
    if (actionMutation.isPending) return;
    setActiveAction(null);
    setComment("");
    setMinutes("");
  };

  return {
    status,
    setStatus,
    logsResult,
    allLogs,
    logs,
    permissions: {
      canManagerEdit: canManagerEditTaskTimeLogs(task, permissionContext),
      canApprove: canApproveTaskTimeLogs(task, permissionContext),
      canReject: canRejectTaskTimeLogs(task, permissionContext),
      canResolve: canResolveTaskTimeLogs(task, permissionContext),
    },
    activeAction,
    comment,
    setComment,
    minutes,
    setMinutes,
    resolveApprove,
    setResolveApprove,
    actionMutation,
    exportMutation,
    openAction,
    closeModal,
  };
};

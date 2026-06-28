import { useMemo, useState } from "react";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveEventAttendance,
  exportEventAttendance,
  type Event,
  getEventAttendanceManagerList,
  rejectEventAttendance,
  resolveEventAttendance,
  type EventAttendanceManagerStatus,
  type EventAttendanceManagerRecord,
} from "@entities/event";
import { ConfirmationModal } from "@shared/ui/modals";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  canApproveEventAttendance,
  canRejectEventAttendance,
  canResolveEventAttendance,
} from "@widgets/events/details/lib/eventPermissions";
import { EntityPageShell } from "./EntityPageShell";
import styles from "./EntityManagementPage.module.scss";

interface EventAttendanceManagerPageLabels {
  eyebrow: string;
  title: string;
  subtitle: string;
  back: string;
  loading: string;
  error: string;
  empty: string;
  user: string;
  checkIn: string;
  checkOut: string;
  minutes: string;
  status: string;
  note: string;
  actions: string;
  export: string;
  allStatuses: string;
  approve: string;
  reject: string;
  resolve: string;
  resolveAsApprove: string;
  resolveAsReject: string;
  commentPlaceholder: string;
  modalTitle: string;
  modalText: string;
  confirm: string;
  cancel: string;
  saved: string;
  failed: string;
  exported: string;
  notProvided: string;
}

interface EventAttendanceManagerPageProps {
  event: Event;
  eventId: string;
  labels: EventAttendanceManagerPageLabels;
  onBack: () => void;
}

type AttendanceAction =
  | "approve"
  | "reject"
  | "resolve";

const statusOptions: EventAttendanceManagerStatus[] = [
  "Draft",
  "CheckedIn",
  "CheckedOutPendingApproval",
  "Approved",
  "Rejected",
  "Disputed",
  "Resolved",
  "Cancelled",
];

const formatDateTime = (value: string | null | undefined, fallback: string) => {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleString();
};

const getRecordUserLabel = (
  record: EventAttendanceManagerRecord,
  fallback: string,
) => record.userName?.trim() || record.userId || fallback;

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

export const EventAttendanceManagerPage = ({
  event,
  eventId,
  labels,
  onBack,
}: EventAttendanceManagerPageProps) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [activeAction, setActiveAction] = useState<{
    type: AttendanceAction;
    record: EventAttendanceManagerRecord;
  } | null>(null);
  const [comment, setComment] = useState("");
  const [resolveApprove, setResolveApprove] = useState(true);
  const canApprove = canApproveEventAttendance(event);
  const canReject = canRejectEventAttendance(event);
  const canResolve = canResolveEventAttendance(event);
  const queryKey = useMemo(
    () => ["event-attendance-manager", eventId, status],
    [eventId, status],
  );
  const attendanceResult = useQuery({
    queryKey,
    queryFn: () =>
      getEventAttendanceManagerList(eventId, {
        Page: 1,
        PageSize: 30,
        Status: status || undefined,
      }),
  });
  const invalidateAttendance = () =>
    queryClient.invalidateQueries({
      queryKey: ["event-attendance-manager", eventId],
    });
  const decisionMutation = useMutation({
    mutationFn: async () => {
      if (!activeAction) return null;
      const payload = { comment: comment.trim() };

      if (activeAction.type === "approve") {
        return approveEventAttendance(eventId, activeAction.record.id, payload);
      }

      if (activeAction.type === "reject") {
        return rejectEventAttendance(eventId, activeAction.record.id, payload);
      }

      return resolveEventAttendance(eventId, activeAction.record.id, {
        approveAttendance: resolveApprove,
        resolutionComment: comment.trim() || undefined,
      });
    },
    onSuccess: async () => {
      await invalidateAttendance();
      addToast({ title: labels.saved, color: "success" });
      setActiveAction(null);
      setComment("");
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });
  const exportMutation = useMutation({
    mutationFn: () => exportEventAttendance(eventId),
    onSuccess: (blob) => {
      downloadBlob(blob, `event-${eventId}-attendance.csv`);
      addToast({ title: labels.exported, color: "success" });
    },
    onError: (error: unknown) =>
      addToast({
        title: labels.failed,
        description: getErrorMessage(error),
        color: "danger",
      }),
  });

  const records = attendanceResult.data?.data ?? [];
  const closeActionModal = () => {
    if (decisionMutation.isPending) return;
    setActiveAction(null);
    setComment("");
  };
  const openAction = (
    type: AttendanceAction,
    record: EventAttendanceManagerRecord,
  ) => {
    setActiveAction({ type, record });
    setResolveApprove(true);
    setComment("");
  };

  return (
    <>
      <EntityPageShell
        eyebrow={labels.eyebrow}
        title={labels.title}
        subtitle={labels.subtitle}
        backLabel={labels.back}
        onBack={onBack}
        headerActions={
          <div className={styles.managerToolbar}>
            <select
              className={styles.statusSelect}
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              aria-label={labels.status}
            >
              <option value="">{labels.allStatuses}</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={styles.exportButton}
              disabled={exportMutation.isPending}
              onClick={() => exportMutation.mutate()}
            >
              {labels.export}
            </button>
          </div>
        }
      >
      {attendanceResult.isPending ? (
        <div className={styles.statePanel}>{labels.loading}</div>
      ) : null}

      {attendanceResult.isError ? (
        <div className={styles.statePanel}>{labels.error}</div>
      ) : null}

      {!attendanceResult.isPending &&
      !attendanceResult.isError &&
      records.length === 0 ? (
        <div className={styles.statePanel}>{labels.empty}</div>
      ) : null}

      {!attendanceResult.isPending &&
      !attendanceResult.isError &&
      records.length > 0 ? (
        <div className={styles.attendancePanel}>
          <table className={styles.attendanceTable}>
            <thead>
              <tr>
                <th>{labels.user}</th>
                <th>{labels.checkIn}</th>
                <th>{labels.checkOut}</th>
                <th>{labels.minutes}</th>
                <th>{labels.status}</th>
                <th>{labels.note}</th>
                <th>{labels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const isPendingApproval =
                  record.status === "CheckedOutPendingApproval";
                const isDisputed = record.status === "Disputed";

                return (
                  <tr key={record.id}>
                    <td>{getRecordUserLabel(record, labels.notProvided)}</td>
                    <td>
                      {formatDateTime(record.checkInAt, labels.notProvided)}
                    </td>
                    <td>
                      {formatDateTime(record.checkOutAt, labels.notProvided)}
                    </td>
                    <td>{record.confirmedMinutes ?? labels.notProvided}</td>
                    <td>
                      {record.status ? (
                        <span className={styles.statusBadge}>
                          {record.status}
                        </span>
                      ) : (
                        labels.notProvided
                      )}
                    </td>
                    <td>
                      {record.resolutionComment?.trim() ||
                        record.comment?.trim() ||
                        labels.notProvided}
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        {isPendingApproval && canApprove ? (
                          <button
                            type="button"
                            className={styles.rowAction}
                            onClick={() => openAction("approve", record)}
                          >
                            {labels.approve}
                          </button>
                        ) : null}
                        {isPendingApproval && canReject ? (
                          <button
                            type="button"
                            className={`${styles.rowAction} ${styles.rowActionDanger}`}
                            onClick={() => openAction("reject", record)}
                          >
                            {labels.reject}
                          </button>
                        ) : null}
                        {isDisputed && canResolve ? (
                          <button
                            type="button"
                            className={styles.rowAction}
                            onClick={() => openAction("resolve", record)}
                          >
                            {labels.resolve}
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
      </EntityPageShell>

      <ConfirmationModal
        isOpen={Boolean(activeAction)}
        title={labels.modalTitle}
        text={labels.modalText}
        confirmText={labels.confirm}
        cancelText={labels.cancel}
        isLoading={decisionMutation.isPending}
        onConfirm={() => decisionMutation.mutate()}
        onCancel={closeActionModal}
      >
        {activeAction?.type === "resolve" ? (
          <div className={styles.modalChoiceRow}>
            <button
              type="button"
              className={`${styles.modalChoice} ${
                resolveApprove ? styles.modalChoiceActive : ""
              }`}
              onClick={() => setResolveApprove(true)}
            >
              {labels.resolveAsApprove}
            </button>
            <button
              type="button"
              className={`${styles.modalChoice} ${
                !resolveApprove ? styles.modalChoiceActive : ""
              }`}
              onClick={() => setResolveApprove(false)}
            >
              {labels.resolveAsReject}
            </button>
          </div>
        ) : null}
        <textarea
          className={styles.modalField}
          value={comment}
          placeholder={labels.commentPlaceholder}
          onChange={(event) => setComment(event.target.value)}
        />
      </ConfirmationModal>
    </>
  );
};

import type { TaskTimeLogRecord } from "@entities/task";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { TaskLogAction, TaskTimeLogsLabels } from "../model/types";
import styles from "./TimeLogsTab.module.scss";

interface TimeLogsListProps {
  logs: TaskTimeLogRecord[];
  labels: TaskTimeLogsLabels;
  permissions: {
    canManagerEdit: boolean;
    canApprove: boolean;
    canReject: boolean;
    canResolve: boolean;
  };
  onOpenAction: (type: TaskLogAction, record: TaskTimeLogRecord) => void;
}

type TimeLogTone = "pending" | "edited" | "approved" | "rejected" | "disputed";

const getUserLabel = (record: TaskTimeLogRecord, fallback: string) =>
  record.userName?.trim() || record.userId || fallback;

const getInitials = (record: TaskTimeLogRecord) => {
  const nameParts = record.userName?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (nameParts.length > 0) {
    return nameParts
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }
  return record.userId.slice(0, 2).toUpperCase();
};

const getTone = (status?: string | null): TimeLogTone => {
  if (status === "Submitted") return "pending";
  if (status === "ManagerEditedPendingVolunteerReconfirm") return "edited";
  if (status === "Approved" || status === "Resolved") return "approved";
  if (status === "Disputed") return "disputed";
  return "rejected";
};

const toneClassNames: Record<TimeLogTone, string> = {
  pending: styles.tonePending,
  edited: styles.toneEdited,
  approved: styles.toneApproved,
  rejected: styles.toneRejected,
  disputed: styles.toneDisputed,
};

const formatDate = (value: string | null | undefined, locale: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale.startsWith("uk") ? "uk-UA" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const MinuteCell = ({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value?: number | null;
  valueClassName?: string;
}) => (
  <div className={styles.minuteCell}>
    <span>{label}</span>
    <strong className={valueClassName}>{value ?? "—"}</strong>
  </div>
);

export const TimeLogsList = ({
  logs,
  labels,
  permissions,
  onOpenAction,
}: TimeLogsListProps) => {
  const { t, i18n } = useTranslation("task");

  if (logs.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Clock3 size={36} strokeWidth={1.7} aria-hidden="true" />
        <strong>{labels.empty}</strong>
        <span>{labels.emptyHint}</span>
      </div>
    );
  }

  const pendingLogs = logs
    .filter(
      (record) =>
        record.status === "Submitted" ||
        record.status === "ManagerEditedPendingVolunteerReconfirm",
    )
    .sort((left, right) =>
      left.status === right.status ? 0 : left.status === "Submitted" ? -1 : 1,
    );
  const disputedLogs = logs.filter((record) => record.status === "Disputed");
  const approvedLogs = logs.filter(
    (record) =>
      record.status === "Approved" || record.status === "Resolved",
  );
  const groupedIds = new Set(
    [...pendingLogs, ...disputedLogs, ...approvedLogs].map(
      (record) => record.id,
    ),
  );
  const groups = [
    { key: "pending", label: labels.sections.pending, records: pendingLogs },
    {
      key: "disputed",
      label: labels.sections.disputed,
      records: disputedLogs,
    },
    {
      key: "approved",
      label: labels.sections.approved,
      records: approvedLogs,
    },
    {
      key: "other",
      label: labels.sections.other,
      records: logs.filter((record) => !groupedIds.has(record.id)),
    },
  ].filter((group) => group.records.length > 0);
  let animationIndex = 0;

  return (
    <div className={styles.sections}>
      {groups.map((group) => (
        <section key={group.key} className={styles.section}>
          <div className={styles.sectionHeader}>
            <span>{group.label}</span>
            <i aria-hidden="true" />
            <strong>{group.records.length}</strong>
          </div>

          <div className={styles.recordsList}>
            {group.records.map((record) => {
              const cardIndex = animationIndex++;
              const isSubmitted = record.status === "Submitted";
              const isDisputed = record.status === "Disputed";
              const tone = getTone(record.status);
              const note =
                record.managerComment?.trim() ||
                record.resolutionComment?.trim() ||
                record.comment?.trim();
              const createdAt = formatDate(record.createdAt, i18n.language);
              const approvedMinutes =
                record.finalApprovedMinutes ?? record.approvedMinutes;

              return (
                <motion.div
                  key={record.id}
                  className={`${styles.recordCard} ${toneClassNames[tone]}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: cardIndex * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className={styles.colorStrip} aria-hidden="true" />
                  <div className={styles.recordBody}>
                    <div className={styles.avatar}>{getInitials(record)}</div>

                    <div className={styles.recordInfo}>
                      <div className={styles.nameRow}>
                        <strong>
                          {getUserLabel(record, labels.table.notProvided)}
                        </strong>
                        {record.status ===
                        "ManagerEditedPendingVolunteerReconfirm" ? (
                          <span className={styles.editedPill}>
                            {labels.badges.managerEdited}
                          </span>
                        ) : null}
                        {isDisputed ? (
                          <span className={styles.disputedPill}>
                            {labels.badges.disputeOpen}
                          </span>
                        ) : null}
                      </div>
                      {createdAt ? <time>{createdAt}</time> : null}
                      {note ? <p>{note}</p> : null}
                    </div>

                    <div className={styles.minutesGroup}>
                      <MinuteCell
                        label={labels.table.logged}
                        value={record.loggedMinutes}
                      />
                      <MinuteCell
                        label={labels.table.adjusted}
                        value={record.managerAdjustedMinutes}
                        valueClassName={
                          record.managerAdjustedMinutes != null
                            ? styles.adjustedValue
                            : undefined
                        }
                      />
                      <MinuteCell
                        label={labels.table.approved}
                        value={approvedMinutes}
                        valueClassName={
                          approvedMinutes != null
                            ? styles.approvedValue
                            : undefined
                        }
                      />
                    </div>

                    <span className={styles.statusBadge}>
                      {t(`timelog.statuses.${record.status}`, {
                        defaultValue:
                          record.status || labels.table.notProvided,
                      })}
                    </span>

                    <div className={styles.rowActions}>
                      {isSubmitted && permissions.canManagerEdit ? (
                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.editAction}`}
                          onClick={() =>
                            onOpenAction("manager-edit", record)
                          }
                        >
                          {labels.actions.managerEdit}
                        </button>
                      ) : null}
                      {isSubmitted && permissions.canApprove ? (
                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.approveAction}`}
                          onClick={() => onOpenAction("approve", record)}
                        >
                          {labels.actions.approve}
                        </button>
                      ) : null}
                      {isSubmitted && permissions.canReject ? (
                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.rejectAction}`}
                          onClick={() => onOpenAction("reject", record)}
                        >
                          {labels.actions.reject}
                        </button>
                      ) : null}
                      {isDisputed && permissions.canResolve ? (
                        <button
                          type="button"
                          className={`${styles.actionButton} ${styles.resolveAction}`}
                          onClick={() => onOpenAction("resolve", record)}
                        >
                          {labels.actions.resolve}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

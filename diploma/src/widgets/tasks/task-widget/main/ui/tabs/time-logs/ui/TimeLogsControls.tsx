import type { TaskTimeLogRecord } from "@entities/task";
import { Download } from "lucide-react";
import type { TaskTimeLogsLabels } from "../model/types";
import styles from "./TimeLogsTab.module.scss";

interface TimeLogsControlsProps {
  status: string;
  logs: TaskTimeLogRecord[];
  labels: TaskTimeLogsLabels;
  isExporting: boolean;
  onStatusChange: (value: string) => void;
  onExport: () => void;
}

const getFilterCount = (logs: TaskTimeLogRecord[], status: string) => {
  if (!status) return logs.length;
  if (status === "Submitted") {
    return logs.filter(
      (record) =>
        record.status === "Submitted" ||
        record.status === "ManagerEditedPendingVolunteerReconfirm",
    ).length;
  }
  if (status === "Approved") {
    return logs.filter(
      (record) =>
        record.status === "Approved" || record.status === "Resolved",
    ).length;
  }
  return logs.filter((record) => record.status === status).length;
};

export const TimeLogsControls = ({
  status,
  logs,
  labels,
  isExporting,
  onStatusChange,
  onExport,
}: TimeLogsControlsProps) => {
  const filters = [
    {
      value: "",
      label: labels.controls.allStatuses,
      dotClassName: styles.dotAll,
    },
    {
      value: "Submitted",
      label: labels.controls.pending,
      dotClassName: styles.dotPending,
    },
    {
      value: "Approved",
      label: labels.controls.approved,
      dotClassName: styles.dotApproved,
    },
    {
      value: "Rejected",
      label: labels.controls.rejected,
      dotClassName: styles.dotRejected,
    },
    {
      value: "Disputed",
      label: labels.controls.disputed,
      dotClassName: styles.dotDisputed,
    },
  ];
  const pendingCount = getFilterCount(logs, "Submitted");
  const approvedMinutes = logs.reduce(
    (total, record) =>
      total +
      (record.finalApprovedMinutes ?? record.approvedMinutes ?? 0),
    0,
  );
  const loggedMinutes = logs.reduce(
    (total, record) => total + (record.loggedMinutes ?? 0),
    0,
  );
  const summary = [
    {
      label: labels.controls.totalRecords,
      value: logs.length,
      valueClassName: "",
    },
    {
      label: labels.controls.pendingRecords,
      value: pendingCount,
      valueClassName: styles.summaryPending,
    },
    {
      label: labels.controls.approvedMinutes,
      value: approvedMinutes,
      valueClassName: styles.summaryApproved,
    },
    {
      label: labels.controls.loggedMinutes,
      value: loggedMinutes,
      valueClassName: "",
    },
  ];

  return (
    <div className={styles.controlsPanel}>
      <div className={styles.controlsHeader}>
        <div className={styles.filterChips}>
          {filters.map((filter) => {
            const isActive = status === filter.value;

            return (
              <button
                key={filter.value || "all"}
                type="button"
                className={`${styles.filterChip} ${
                  isActive ? styles.filterChipActive : ""
                }`}
                aria-pressed={isActive}
                onClick={() => onStatusChange(filter.value)}
              >
                <span
                  className={`${styles.filterDot} ${filter.dotClassName}`}
                  aria-hidden="true"
                />
                <span>{filter.label}</span>
                <span className={styles.filterCount}>
                  {getFilterCount(logs, filter.value)}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.exportButton}
          disabled={isExporting}
          onClick={onExport}
        >
          <Download size={16} strokeWidth={2.4} />
          <span>{labels.controls.export}</span>
        </button>
      </div>

      <div className={styles.summaryGrid}>
        {summary.map((item) => (
          <div key={item.label} className={styles.summaryTile}>
            <strong className={item.valueClassName}>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

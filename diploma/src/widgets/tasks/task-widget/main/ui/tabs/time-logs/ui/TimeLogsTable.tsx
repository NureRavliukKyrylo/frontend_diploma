import type { TaskTimeLogRecord } from "@entities/task";
import type { TaskLogAction, TaskTimeLogsLabels } from "../model/types";
import styles from "../../TaskTabs.module.scss";
import { useTranslation } from "react-i18next";

interface TimeLogsTableProps {
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

const getUserLabel = (record: TaskTimeLogRecord, fallback: string) =>
  record.userName?.trim() || record.userId || fallback;

export const TimeLogsTable = ({
  logs,
  labels,
  permissions,
  onOpenAction,
}: TimeLogsTableProps) => {
  const { t } = useTranslation("task");

  return (
    <div className={styles.tablePanel}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{labels.table.volunteer}</th>
            <th>{labels.table.logged}</th>
            <th>{labels.table.adjusted}</th>
            <th>{labels.table.approved}</th>
            <th>{labels.table.status}</th>
            <th>{labels.table.note}</th>
            <th>{labels.table.actions}</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((record) => {
            const isSubmitted = record.status === "Submitted";
            const isDisputed = record.status === "Disputed";

            return (
              <tr key={record.id}>
                <td>{getUserLabel(record, labels.table.notProvided)}</td>
                <td>{record.loggedMinutes ?? labels.table.notProvided}</td>
                <td>
                  {record.managerAdjustedMinutes ?? labels.table.notProvided}
                </td>
                <td>
                  {record.finalApprovedMinutes ??
                    record.approvedMinutes ??
                    labels.table.notProvided}
                </td>
                <td>
                  {record.status ? (
                    <span className={styles.statusBadge}>
                      {t(`timelog.statuses.${record.status}`, {
                        defaultValue: record.status,
                      })}
                    </span>
                  ) : (
                    labels.table.notProvided
                  )}
                </td>
                <td>
                  {record.managerComment?.trim() ||
                    record.resolutionComment?.trim() ||
                    record.comment?.trim() ||
                    labels.table.notProvided}
                </td>
                <td>
                  <div className={styles.rowActions}>
                    {isSubmitted && permissions.canManagerEdit ? (
                      <button
                        type="button"
                        className={styles.rowAction}
                        onClick={() => onOpenAction("manager-edit", record)}
                      >
                        {labels.actions.managerEdit}
                      </button>
                    ) : null}
                    {isSubmitted && permissions.canApprove ? (
                      <button
                        type="button"
                        className={styles.rowAction}
                        onClick={() => onOpenAction("approve", record)}
                      >
                        {labels.actions.approve}
                      </button>
                    ) : null}
                    {isSubmitted && permissions.canReject ? (
                      <button
                        type="button"
                        className={`${styles.rowAction} ${styles.rowActionDanger}`}
                        onClick={() => onOpenAction("reject", record)}
                      >
                        {labels.actions.reject}
                      </button>
                    ) : null}
                    {isDisputed && permissions.canResolve ? (
                      <button
                        type="button"
                        className={styles.rowAction}
                        onClick={() => onOpenAction("resolve", record)}
                      >
                        {labels.actions.resolve}
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
  );
};

import { Ban, Trash2 } from "lucide-react";
import styles from "../TaskEditSettings.module.scss";

interface DangerTabProps {
  taskStatus: string;
  isCancelPending: boolean;
  isDeletePending: boolean;
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const statusLabelMap: Record<string, string> = {
  Pending: "Pending",
  InProgress: "In progress",
  Completed: "Completed",
  Cancelled: "Cancelled",
  Overdue: "Overdue",
};

export const DangerTab = ({
  taskStatus,
  isCancelPending,
  isDeletePending,
  onCancelClick,
  onDeleteClick,
}: DangerTabProps) => {
  const isCancelled = taskStatus === "Cancelled";

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Danger zone</h2>
        <p className={styles.sectionDescription}>
          Cancel or permanently delete this task.
        </p>

        <div className={styles.statusDisplay}>
          <span>Current status</span>
          <strong
            className={`${styles.taskStatusPill} ${
              styles[`taskStatus${taskStatus}`] ?? ""
            }`}
          >
            {statusLabelMap[taskStatus] ?? taskStatus}
          </strong>
        </div>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>{isCancelled ? "Task cancelled" : "Cancel task"}</h3>
              <p>
                {isCancelled
                  ? "This task has already been cancelled."
                  : "Moves this task to Cancelled using the dedicated status endpoint."}
              </p>
            </div>

            {isCancelled ? (
              <span className={styles.cancelledState}>Cancelled</span>
            ) : (
              <button
                type="button"
                className={styles.dangerButton}
                disabled={isCancelPending}
                onClick={onCancelClick}
              >
                <Ban size={15} />
                {isCancelPending ? "Cancelling" : "Cancel task"}
              </button>
            )}
          </div>

          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>Delete task</h3>
              <p>
                Permanently removes this task. This action cannot be undone.
              </p>
            </div>

            <button
              type="button"
              className={styles.dangerButton}
              disabled={isDeletePending}
              onClick={onDeleteClick}
            >
              <Trash2 size={15} />
              {isDeletePending ? "Deleting" : "Delete task"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

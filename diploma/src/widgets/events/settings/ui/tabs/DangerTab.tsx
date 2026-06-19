import { Ban } from "lucide-react";
import type { EventStatus } from "@features/event";
import styles from "./DangerTab.module.scss";

interface DangerTabProps {
  eventStatus: EventStatus;
  isCancelPending: boolean;
  onCancelClick: () => void;
}

export const DangerTab = ({
  eventStatus,
  isCancelPending,
  onCancelClick,
}: DangerTabProps) => {
  const isCancelled = eventStatus === "cancelled" || eventStatus === "archived";

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Danger zone</h2>
        <p className={styles.sectionDescription}>
          Control whether this event remains available to volunteers.
        </p>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>{isCancelled ? "Event cancelled" : "Cancel event"}</h3>
              <p>
                {isCancelled
                  ? "This event has been cancelled and cannot be restored from this page."
                  : "Cancels the event and deactivates volunteer participation for it."}
              </p>
            </div>

            {isCancelled ? (
              <span className={styles.cancelledState}>Cancelled</span>
            ) : (
              <button
                type="button"
                className={styles.cancelButton}
                disabled={isCancelPending}
                onClick={onCancelClick}
              >
                <Ban size={15} />
                {isCancelPending ? "Cancelling" : "Cancel event"}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

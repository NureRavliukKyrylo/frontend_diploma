import { Archive, RotateCcw } from "lucide-react";
import type { EntityStatus } from "@shared/config/types";
import styles from "./DangerTab.module.scss";

interface DangerTabProps {
  projectStatus: EntityStatus;
  isArchivePending: boolean;
  isRecoverPending: boolean;
  onArchiveClick: () => void;
  onRecoverClick: () => void;
}

export const DangerTab = ({
  projectStatus,
  isArchivePending,
  isRecoverPending,
  onArchiveClick,
  onRecoverClick,
}: DangerTabProps) => {
  const isArchived = projectStatus === "archived";

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Danger zone</h2>
        <p className={styles.sectionDescription}>
          Control whether this project is visible and active.
        </p>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>{isArchived ? "Recover project" : "Archive project"}</h3>
              <p>
                {isArchived
                  ? "Restores the project to the public project experience."
                  : "Hides the project from public listings. It can be restored later."}
              </p>
            </div>

            <button
              type="button"
              className={
                isArchived ? styles.recoverButton : styles.archiveButton
              }
              disabled={isArchived ? isRecoverPending : isArchivePending}
              onClick={isArchived ? onRecoverClick : onArchiveClick}
            >
              {isArchived ? <RotateCcw size={15} /> : <Archive size={15} />}
              {isArchived
                ? isRecoverPending
                  ? "Recovering"
                  : "Recover"
                : isArchivePending
                  ? "Archiving"
                  : "Archive"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

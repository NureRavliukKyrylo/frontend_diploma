import { Archive, Trash2 } from "lucide-react";
import type { Organization } from "@entities/organization";
import styles from "./DangerTab.module.scss";

interface DangerTabProps {
  organizationId: string;
  organization: Organization;
  isArchivePending: boolean;
  onArchiveClick: () => void;
  onDeleteClick: () => void;
}

export const DangerTab = ({
  isArchivePending,
  onArchiveClick,
  onDeleteClick,
}: DangerTabProps) => {
  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>Danger zone</h2>
        <p className={styles.sectionDescription}>
          These actions can affect visibility and long-term organization data.
        </p>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>Archive organization</h3>
              <p>Hides from public listings. Can be restored later.</p>
            </div>

            <button
              type="button"
              className={styles.archiveButton}
              disabled={isArchivePending}
              onClick={onArchiveClick}
            >
              <Archive size={15} />
              {isArchivePending ? "Archiving" : "Archive"}
            </button>
          </div>

          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>Delete organization</h3>
              <p>Permanently deletes all data. This cannot be undone.</p>
            </div>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={onDeleteClick}
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

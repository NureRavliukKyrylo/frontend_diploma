import { Archive, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("organizations");
  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>{t("settings.danger.title")}</h2>
        <p className={styles.sectionDescription}>
          {t("settings.danger.description")}
        </p>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>{t("settings.danger.archive")}</h3>
              <p>{t("settings.danger.archiveText")}</p>
            </div>

            <button
              type="button"
              className={styles.archiveButton}
              disabled={isArchivePending}
              onClick={onArchiveClick}
            >
              <Archive size={15} />
              {isArchivePending
                ? t("settings.danger.archiving")
                : t("settings.modals.archiveConfirm")}
            </button>
          </div>

          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>{t("settings.danger.delete")}</h3>
              <p>{t("settings.danger.deleteText")}</p>
            </div>

            <button
              type="button"
              className={styles.deleteButton}
              onClick={onDeleteClick}
            >
              <Trash2 size={15} />
              {t("settings.danger.deleteButton")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

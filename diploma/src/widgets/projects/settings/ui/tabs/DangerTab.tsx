import { Archive, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("project");
  const isArchived = projectStatus === "archived";

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
              <h3>
                {isArchived
                  ? t("settings.danger.recover")
                  : t("settings.danger.archive")}
              </h3>
              <p>
                {isArchived
                  ? t("settings.danger.recoverText")
                  : t("settings.danger.archiveText")}
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
                  ? t("settings.danger.recovering")
                  : t("settings.modals.recover")
                : isArchivePending
                  ? t("settings.danger.archiving")
                  : t("settings.modals.archive")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

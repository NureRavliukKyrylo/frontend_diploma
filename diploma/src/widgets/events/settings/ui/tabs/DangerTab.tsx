import { Ban } from "lucide-react";
import type { EventStatus } from "@features/event";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("event");
  const isCancelled = eventStatus === "cancelled" || eventStatus === "archived";

  return (
    <div className={styles.sectionsContainer}>
      <section className={styles.section}>
        <h2 className={styles.sectionLabel}>
          {t("settings.danger.title")}
        </h2>
        <p className={styles.sectionDescription}>
          {t("settings.danger.description")}
        </p>

        <div className={styles.dangerRows}>
          <div className={styles.dangerRow}>
            <div className={styles.dangerCopy}>
              <h3>
                {isCancelled
                  ? t("settings.danger.cancelledTitle")
                  : t("settings.danger.cancel")}
              </h3>
              <p>
                {isCancelled
                  ? t("settings.danger.cancelledText")
                  : t("settings.danger.cancelText")}
              </p>
            </div>

            {isCancelled ? (
              <span className={styles.cancelledState}>
                {t("settings.danger.cancelled")}
              </span>
            ) : (
              <button
                type="button"
                className={styles.cancelButton}
                disabled={isCancelPending}
                onClick={onCancelClick}
              >
                <Ban size={15} />
                {isCancelPending
                  ? t("settings.modals.cancelling")
                  : t("settings.danger.cancel")}
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

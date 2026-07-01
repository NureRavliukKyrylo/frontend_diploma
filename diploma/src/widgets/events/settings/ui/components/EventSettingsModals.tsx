import { BaseModal, ConfirmationModal } from "@shared/ui/modals";
import { useTranslation } from "react-i18next";
import styles from "../SettingsWidget.module.scss";

interface EventSettingsModalsProps {
  isSaveModalOpen: boolean;
  isCancelModalOpen: boolean;
  cancelReason: string;
  hasPendingPolicyChange: boolean;
  isSavePending: boolean;
  isCancelPending: boolean;
  onSaveConfirm: () => void;
  onSaveCancel: () => void;
  onPolicyConfirm: () => void;
  onPolicyCancel: () => void;
  onCancelModalClose: () => void;
  onCancelReasonChange: (value: string) => void;
  onCancelEvent: () => void;
}

export const EventSettingsModals = ({
  isSaveModalOpen,
  isCancelModalOpen,
  cancelReason,
  hasPendingPolicyChange,
  isSavePending,
  isCancelPending,
  onSaveConfirm,
  onSaveCancel,
  onPolicyConfirm,
  onPolicyCancel,
  onCancelModalClose,
  onCancelReasonChange,
  onCancelEvent,
}: EventSettingsModalsProps) => {
  const { t } = useTranslation("event");

  return (
    <>
    <ConfirmationModal
      isOpen={isSaveModalOpen}
      title={t("settings.modals.saveTitle")}
      text={t("settings.modals.saveText")}
      confirmText={t("settings.topBar.save")}
      cancelText={t("settings.modals.cancel")}
      isLoading={isSavePending}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title={t("settings.modals.policyTitle")}
      text={t("settings.modals.policyText")}
      confirmText={t("settings.modals.apply")}
      cancelText={t("settings.modals.cancel")}
      onConfirm={onPolicyConfirm}
      onCancel={onPolicyCancel}
    />

    <BaseModal
      isOpen={isCancelModalOpen}
      onClose={onCancelModalClose}
      maxWidth="560px"
      showClosed={false}
    >
      <div className={styles.cancelModal}>
        <h2>{t("settings.modals.cancelTitle")}</h2>
        <p>{t("settings.modals.cancelText")}</p>
        <label>
          <span>{t("settings.modals.reason")}</span>
          <input
            value={cancelReason}
            maxLength={160}
            placeholder={t("settings.modals.reasonPlaceholder")}
            onChange={(event) => onCancelReasonChange(event.target.value)}
          />
        </label>
        <div className={styles.cancelModalActions}>
          <button
            type="button"
            className={styles.cancelModalGhost}
            onClick={onCancelModalClose}
          >
            {t("settings.modals.keepEvent")}
          </button>
          <button
            type="button"
            className={styles.cancelModalConfirm}
            disabled={isCancelPending}
            onClick={onCancelEvent}
          >
            {isCancelPending
              ? t("settings.modals.cancelling")
              : t("settings.modals.cancelEvent")}
          </button>
        </div>
      </div>
    </BaseModal>
    </>
  );
};

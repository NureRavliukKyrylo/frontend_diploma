import { useTranslation } from "react-i18next";
import { ConfirmationModal } from "@shared/ui/modals";

interface ProjectSettingsModalsProps {
  isSaveModalOpen: boolean;
  hasPendingPolicyChange: boolean;
  isArchiveModalOpen: boolean;
  isRecoverModalOpen: boolean;
  isSavePending: boolean;
  isArchivePending: boolean;
  isRecoverPending: boolean;
  onSaveConfirm: () => void;
  onSaveCancel: () => void;
  onPolicyConfirm: () => void;
  onPolicyCancel: () => void;
  onArchiveConfirm: () => void;
  onArchiveCancel: () => void;
  onRecoverConfirm: () => void;
  onRecoverCancel: () => void;
}

export const ProjectSettingsModals = ({
  isSaveModalOpen,
  hasPendingPolicyChange,
  isArchiveModalOpen,
  isRecoverModalOpen,
  isSavePending,
  isArchivePending,
  isRecoverPending,
  onSaveConfirm,
  onSaveCancel,
  onPolicyConfirm,
  onPolicyCancel,
  onArchiveConfirm,
  onArchiveCancel,
  onRecoverConfirm,
  onRecoverCancel,
}: ProjectSettingsModalsProps) => {
  const { t } = useTranslation("project");

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

    <ConfirmationModal
      isOpen={isArchiveModalOpen}
      title={t("settings.modals.archiveTitle")}
      text={t("settings.modals.archiveText")}
      confirmText={t("settings.modals.archive")}
      cancelText={t("settings.modals.cancel")}
      isLoading={isArchivePending}
      onConfirm={onArchiveConfirm}
      onCancel={onArchiveCancel}
    />

    <ConfirmationModal
      isOpen={isRecoverModalOpen}
      title={t("settings.modals.recoverTitle")}
      text={t("settings.modals.recoverText")}
      confirmText={t("settings.modals.recover")}
      cancelText={t("settings.modals.cancel")}
      isLoading={isRecoverPending}
      onConfirm={onRecoverConfirm}
      onCancel={onRecoverCancel}
    />
    </>
  );
};

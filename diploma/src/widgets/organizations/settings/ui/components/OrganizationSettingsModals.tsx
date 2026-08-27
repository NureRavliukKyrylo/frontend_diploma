import { useTranslation } from "react-i18next";
import { ModalCropper } from "@features/profile/upload-image/ui/modal-window/ModalCropper";
import { ConfirmationModal } from "@shared/ui/modals";

interface OrganizationSettingsModalsProps {
  logoCropUrl?: string | null;
  isSaveModalOpen: boolean;
  hasPendingPolicyChange: boolean;
  isArchiveModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isSaving: boolean;
  isArchivePending: boolean;
  onLogoCropClose: () => void;
  onLogoCropSave: (file: File) => void;
  onSaveConfirm: () => void;
  onSaveCancel: () => void;
  onPolicyConfirm: () => void;
  onPolicyCancel: () => void;
  onArchiveConfirm: () => void;
  onArchiveCancel: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

export const OrganizationSettingsModals = ({
  logoCropUrl,
  isSaveModalOpen,
  hasPendingPolicyChange,
  isArchiveModalOpen,
  isDeleteModalOpen,
  isSaving,
  isArchivePending,
  onLogoCropClose,
  onLogoCropSave,
  onSaveConfirm,
  onSaveCancel,
  onPolicyConfirm,
  onPolicyCancel,
  onArchiveConfirm,
  onArchiveCancel,
  onDeleteConfirm,
  onDeleteCancel,
}: OrganizationSettingsModalsProps) => {
  const { t } = useTranslation("organizations");

  return (
    <>
    {logoCropUrl ? (
      <ModalCropper
        src={logoCropUrl}
        isOpen={Boolean(logoCropUrl)}
        onClose={onLogoCropClose}
        onSave={onLogoCropSave}
        maxWidth="720px"
      />
    ) : null}

    <ConfirmationModal
      isOpen={isSaveModalOpen}
      title={t("settings.modals.saveTitle")}
      text={t("settings.modals.saveText")}
      confirmText={t("settings.topBar.save")}
      cancelText={t("settings.modals.cancel")}
      isLoading={isSaving}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title={t("settings.modals.policyTitle")}
      text={t("settings.modals.policyText")}
      confirmText={t("settings.modals.policyConfirm")}
      cancelText={t("settings.modals.cancel")}
      onConfirm={onPolicyConfirm}
      onCancel={onPolicyCancel}
    />

    <ConfirmationModal
      isOpen={isArchiveModalOpen}
      title={t("settings.danger.archiveModalTitle")}
      text={t("settings.danger.archiveModalText")}
      confirmText={t("settings.modals.archiveConfirm")}
      cancelText={t("settings.modals.cancel")}
      isLoading={isArchivePending}
      onConfirm={onArchiveConfirm}
      onCancel={onArchiveCancel}
    />

    <ConfirmationModal
      isOpen={isDeleteModalOpen}
      title={t("settings.danger.deleteModalTitle")}
      text={t("settings.danger.deleteModalText")}
      confirmText={t("settings.modals.deleteConfirm")}
      cancelText={t("settings.modals.cancel")}
      onConfirm={onDeleteConfirm}
      onCancel={onDeleteCancel}
    />
    </>
  );
};

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
}: OrganizationSettingsModalsProps) => (
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
      title="Save changes?"
      text="Are you sure you want to save these changes?"
      confirmText="Save changes"
      cancelText="Cancel"
      isLoading={isSaving}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title="Change policy?"
      text="Changing this policy will affect how members join/leave. Are you sure?"
      confirmText="Change policy"
      cancelText="Cancel"
      onConfirm={onPolicyConfirm}
      onCancel={onPolicyCancel}
    />

    <ConfirmationModal
      isOpen={isArchiveModalOpen}
      title="Archive organization?"
      text="Are you sure you want to archive this organization? It will be hidden from public listings."
      confirmText="Archive"
      cancelText="Cancel"
      isLoading={isArchivePending}
      onConfirm={onArchiveConfirm}
      onCancel={onArchiveCancel}
    />

    <ConfirmationModal
      isOpen={isDeleteModalOpen}
      title="Delete organization?"
      text="This will permanently delete the organization and all its data. This cannot be undone."
      confirmText="I understand"
      cancelText="Cancel"
      onConfirm={onDeleteConfirm}
      onCancel={onDeleteCancel}
    />
  </>
);

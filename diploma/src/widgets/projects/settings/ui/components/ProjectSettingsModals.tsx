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
}: ProjectSettingsModalsProps) => (
  <>
    <ConfirmationModal
      isOpen={isSaveModalOpen}
      title="Save project settings?"
      text="Your changes will update the public project profile and access rules."
      confirmText="Save changes"
      cancelText="Cancel"
      isLoading={isSavePending}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title="Change access policy?"
      text="This policy change will apply after you save the project settings."
      confirmText="Apply"
      cancelText="Cancel"
      onConfirm={onPolicyConfirm}
      onCancel={onPolicyCancel}
    />

    <ConfirmationModal
      isOpen={isArchiveModalOpen}
      title="Archive this project?"
      text="The project will be hidden from public listings and can be recovered later."
      confirmText="Archive"
      cancelText="Cancel"
      isLoading={isArchivePending}
      onConfirm={onArchiveConfirm}
      onCancel={onArchiveCancel}
    />

    <ConfirmationModal
      isOpen={isRecoverModalOpen}
      title="Recover this project?"
      text="The project will be restored to the project experience."
      confirmText="Recover"
      cancelText="Cancel"
      isLoading={isRecoverPending}
      onConfirm={onRecoverConfirm}
      onCancel={onRecoverCancel}
    />
  </>
);

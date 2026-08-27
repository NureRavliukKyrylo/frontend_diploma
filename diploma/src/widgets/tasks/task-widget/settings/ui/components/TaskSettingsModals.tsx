import { ConfirmationModal } from "@shared/ui/modals";

interface TaskSettingsModalsProps {
  isSaveModalOpen: boolean;
  hasPendingPolicyChange: boolean;
  isCancelModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isSavePending: boolean;
  isCancelPending: boolean;
  isDeletePending: boolean;
  onSaveConfirm: () => void;
  onSaveCancel: () => void;
  onPolicyConfirm: () => void;
  onPolicyCancel: () => void;
  onCancelTask: () => void;
  onCancelModalClose: () => void;
  onDeleteTask: () => void;
  onDeleteModalClose: () => void;
}

export const TaskSettingsModals = ({
  isSaveModalOpen,
  hasPendingPolicyChange,
  isCancelModalOpen,
  isDeleteModalOpen,
  isSavePending,
  isCancelPending,
  isDeletePending,
  onSaveConfirm,
  onSaveCancel,
  onPolicyConfirm,
  onPolicyCancel,
  onCancelTask,
  onCancelModalClose,
  onDeleteTask,
  onDeleteModalClose,
}: TaskSettingsModalsProps) => (
  <>
    <ConfirmationModal
      isOpen={isSaveModalOpen}
      title="Save task settings?"
      text="Your changes will update the task details and access rules."
      confirmText="Save changes"
      cancelText="Cancel"
      isLoading={isSavePending}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title="Change access policy?"
      text="This policy change will apply after you save the task settings."
      confirmText="Apply"
      cancelText="Cancel"
      onConfirm={onPolicyConfirm}
      onCancel={onPolicyCancel}
    />

    <ConfirmationModal
      isOpen={isCancelModalOpen}
      title="Cancel this task?"
      text="The task will move to Cancelled using the dedicated status endpoint."
      confirmText="Cancel task"
      cancelText="Keep task"
      isLoading={isCancelPending}
      onConfirm={onCancelTask}
      onCancel={onCancelModalClose}
    />

    <ConfirmationModal
      isOpen={isDeleteModalOpen}
      title="Delete this task permanently?"
      text="This permanently deletes the task and cannot be undone."
      confirmText="Delete task"
      cancelText="Keep task"
      isLoading={isDeletePending}
      onConfirm={onDeleteTask}
      onCancel={onDeleteModalClose}
    />
  </>
);

import { BaseModal, ConfirmationModal } from "@shared/ui/modals";
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
}: EventSettingsModalsProps) => (
  <>
    <ConfirmationModal
      isOpen={isSaveModalOpen}
      title="Save event settings?"
      text="Your changes will update the public event profile and access rules."
      confirmText="Save changes"
      cancelText="Cancel"
      isLoading={isSavePending}
      onConfirm={onSaveConfirm}
      onCancel={onSaveCancel}
    />

    <ConfirmationModal
      isOpen={hasPendingPolicyChange}
      title="Change access policy?"
      text="This policy change will apply after you save the event settings."
      confirmText="Apply"
      cancelText="Cancel"
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
        <h2>Cancel this event?</h2>
        <p>
          This event will be marked as cancelled and volunteer participation
          will be deactivated.
        </p>
        <label>
          <span>Reason (optional)</span>
          <input
            value={cancelReason}
            maxLength={160}
            placeholder="Briefly explain why this event is being cancelled"
            onChange={(event) => onCancelReasonChange(event.target.value)}
          />
        </label>
        <div className={styles.cancelModalActions}>
          <button
            type="button"
            className={styles.cancelModalGhost}
            onClick={onCancelModalClose}
          >
            Keep event
          </button>
          <button
            type="button"
            className={styles.cancelModalConfirm}
            disabled={isCancelPending}
            onClick={onCancelEvent}
          >
            {isCancelPending ? "Cancelling" : "Cancel event"}
          </button>
        </div>
      </div>
    </BaseModal>
  </>
);

import { ConfirmationModal } from "@shared/ui/modals";
import type { ActiveTaskLogAction, TaskTimeLogsLabels } from "../model/types";
import styles from "../../TaskTabs.module.scss";

interface TimeLogDecisionModalProps {
  activeAction: ActiveTaskLogAction | null;
  labels: TaskTimeLogsLabels;
  minutes: string;
  comment: string;
  resolveApprove: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onMinutesChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onResolveApproveChange: (value: boolean) => void;
}

export const TimeLogDecisionModal = ({
  activeAction,
  labels,
  minutes,
  comment,
  resolveApprove,
  isLoading,
  onConfirm,
  onCancel,
  onMinutesChange,
  onCommentChange,
  onResolveApproveChange,
}: TimeLogDecisionModalProps) => (
  <ConfirmationModal
    isOpen={Boolean(activeAction)}
    title={labels.modal.title}
    text={labels.modal.text}
    confirmText={labels.modal.confirm}
    cancelText={labels.modal.cancel}
    isLoading={isLoading}
    onConfirm={onConfirm}
    onCancel={onCancel}
  >
    {activeAction?.type === "resolve" ? (
      <div className={styles.modalChoiceRow}>
        <button
          type="button"
          className={`${styles.modalChoice} ${
            resolveApprove ? styles.modalChoiceActive : ""
          }`}
          onClick={() => onResolveApproveChange(true)}
        >
          {labels.actions.resolveAsApprove}
        </button>
        <button
          type="button"
          className={`${styles.modalChoice} ${
            !resolveApprove ? styles.modalChoiceActive : ""
          }`}
          onClick={() => onResolveApproveChange(false)}
        >
          {labels.actions.resolveAsReject}
        </button>
      </div>
    ) : null}
    {activeAction?.type === "manager-edit" ||
    (activeAction?.type === "resolve" && resolveApprove) ? (
      <input
        className={styles.modalInput}
        type="number"
        min={0}
        value={minutes}
        placeholder={
          activeAction?.type === "manager-edit"
            ? labels.modal.minutes
            : labels.modal.finalMinutes
        }
        onChange={(event) => onMinutesChange(event.target.value)}
      />
    ) : null}
    <textarea
      className={styles.modalField}
      value={comment}
      placeholder={labels.modal.commentPlaceholder}
      onChange={(event) => onCommentChange(event.target.value)}
    />
  </ConfirmationModal>
);

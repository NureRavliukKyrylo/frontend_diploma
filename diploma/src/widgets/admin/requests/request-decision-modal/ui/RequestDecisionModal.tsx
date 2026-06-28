import { ConfirmationModal } from "@shared/ui/modals";
import {
  getActionLabel,
  getActionPastLabel,
} from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import type { DecisionTarget } from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";

interface RequestDecisionModalProps {
  target: DecisionTarget | null;
  comment: string;
  assignToTask: boolean;
  isPending: boolean;
  error: string | null;
  onCommentChange: (value: string) => void;
  onAssignToTaskChange: (value: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const RequestDecisionModal = ({
  target,
  comment,
  assignToTask,
  isPending,
  error,
  onCommentChange,
  onAssignToTaskChange,
  onConfirm,
  onCancel,
}: RequestDecisionModalProps) => (
  <ConfirmationModal
    isOpen={Boolean(target)}
    title={
      target
        ? `${getActionLabel(target.action)} this request?`
        : "Confirm request decision"
    }
    text={
      target
        ? `${target.request.title} will be ${getActionPastLabel(target.action)}.`
        : "Confirm this request decision."
    }
    confirmText={
      target?.action === "approve" ? "Confirm approval" : "Confirm rejection"
    }
    cancelText="Cancel"
    isLoading={isPending}
    onConfirm={onConfirm}
    onCancel={onCancel}
    error={error}
    maxWidth="620px"
    confirmButtonClassName={
      target?.action === "reject" ? styles.modalRejectButton : undefined
    }
  >
    <label className={styles.commentField}>
      <span>Decision comment (optional)</span>
      <textarea
        value={comment}
        maxLength={1000}
        onChange={(event) => onCommentChange(event.target.value)}
        placeholder="Add a short note for the audit trail"
      />
    </label>

    {target?.request.typeName === "taskJoin" && target.action === "approve" && (
      <label className={styles.assignField}>
        <input
          type="checkbox"
          checked={assignToTask}
          onChange={(event) => onAssignToTaskChange(event.target.checked)}
        />
        <span>Assign volunteer to the task after approval</span>
      </label>
    )}
  </ConfirmationModal>
);

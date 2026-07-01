import { ConfirmationModal } from "@shared/ui/modals";
import { getActionPastLabel } from "@widgets/admin/requests/requests-config/libs/requestHelpers";
import type { DecisionTarget } from "@widgets/admin/requests/requests-config/libs/requestTypeConfig";
import styles from "../../requests-page-styles/AdminRequestsPage.module.scss";
import { useTranslation } from "react-i18next";

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
}: RequestDecisionModalProps) => {
  const { t } = useTranslation("admin");
  const pastLabel = target ? getActionPastLabel(target.action, t) : "";

  return (
    <ConfirmationModal
      isOpen={Boolean(target)}
      title={
        target
          ? target.action === "approve"
            ? t("requests.decision.titleApprove")
            : t("requests.decision.titleReject")
          : t("requests.decision.confirmTitle")
      }
      text={
        target
          ? t("requests.decision.result", {
              title: target.request.title,
              status: pastLabel,
            })
          : t("requests.decision.confirmText")
      }
      confirmText={
        target?.action === "approve"
          ? t("requests.decision.confirmApproval")
          : t("requests.decision.confirmRejection")
      }
      cancelText={t("common.actions.cancel")}
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
        <span>{t("requests.decision.comment")}</span>
        <textarea
          value={comment}
          maxLength={1000}
          onChange={(event) => onCommentChange(event.target.value)}
          placeholder={t("requests.decision.placeholder")}
        />
      </label>

      {target?.request.typeName === "taskJoin" &&
        target.action === "approve" && (
          <label className={styles.assignField}>
            <input
              type="checkbox"
              checked={assignToTask}
              onChange={(event) => onAssignToTaskChange(event.target.checked)}
            />
            <span>{t("requests.decision.assignVolunteer")}</span>
          </label>
        )}
    </ConfirmationModal>
  );
};

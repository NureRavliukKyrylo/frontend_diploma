import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useBlockUser } from "../../model/useBlockUser";
import styles from "./BlockUserModal.module.scss";
import { reportReasonOptions } from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import type { ReportReason } from "@entities/report/model";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetUserId: string;
  entityType: string;
  entityId: string;
}

export const BlockUserModal = ({
  isOpen,
  onClose,
  caseId,
  targetUserId,
  entityType,
  entityId,
}: BlockUserModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useBlockUser({
    caseId,
    targetUserId,
    entityType,
    entityId,
    onSuccess: handleClose,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="520px"
      showClosed={false}
    >
      <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Block User</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Reason</span>
          <SortDropDown
            options={reportReasonOptions}
            value={formik.values.reason as ReportReason}
            onSelect={(value) => formik.setFieldValue("reason", value)}
            label="Reason"
            variant="report"
          />
          {formik.submitCount > 0 && formik.errors.reason && (
            <div className="errorInput">{formik.errors.reason}</div>
          )}
        </div>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            Block User
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useHideContent } from "../../model/useHideContent";
import styles from "./HideContentModal.module.scss";
import { reportReasonOptions } from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import type { ReportReason } from "@entities/report/model";
import type { EntityType } from "@shared/config/types";

interface HideContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetEntityType: EntityType;
  targetEntityId: string;
}

export const HideContentModal = ({
  isOpen,
  onClose,
  caseId,
  targetEntityType,
  targetEntityId,
}: HideContentModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useHideContent({
    caseId,
    targetEntityType,
    targetEntityId,
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
          <h1 className={styles.title}>Hide Content</h1>
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
            Hide Content
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

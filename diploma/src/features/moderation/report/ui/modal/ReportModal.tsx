import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import { useSendReport } from "../../model/useSendReport";
import styles from "./ReportModal.module.scss";
import {
  reportReasonOptions,
  ModerationSubjectType,
  getModerationSubjectLabel,
} from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import type { ReportReason } from "@entities/report/model";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectType: ModerationSubjectType;
  subjectId: string;
}

export const ReportModal = ({
  isOpen,
  onClose,
  subjectType,
  subjectId,
}: ReportModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useSendReport({
    subjectType,
    subjectId,
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
          <h1 className={styles.title}>
            Report {getModerationSubjectLabel(subjectType)}
          </h1>
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

        <div className={styles.field}>
          <span className={styles.label}>Details</span>
          <TextAreaForm
            name="details"
            placeholder="Describe the issue..."
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={200}
            rows={4}
          />
          {formik.submitCount > 0 && formik.errors.details && (
            <div className="errorInput">{formik.errors.details}</div>
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
            Submit Report
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

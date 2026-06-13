import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { DatePickerInput } from "@shared/ui/inputs";
import { useBanUser } from "../../model/useBanUser";
import styles from "./BanUserModal.module.scss";
import { reportReasonOptions } from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import type { ReportReason } from "@entities/report/model";
import { today, getLocalTimeZone } from "@internationalized/date";

interface BanUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetUserId: string;
}

export const BanUserModal = ({
  isOpen,
  onClose,
  caseId,
  targetUserId,
}: BanUserModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useBanUser({
    caseId,
    targetUserId,
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
          <h1 className={styles.title}>Ban User</h1>
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
          <span className={styles.label}>Ban until</span>
          <DatePickerInput
            value={formik.values.expiresAt}
            onChange={(value) => formik.setFieldValue("expiresAt", value)}
            error={formik.errors.expiresAt}
            submit={formik.submitCount > 0}
            minValue={today(getLocalTimeZone())}
          />
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
            Ban User
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

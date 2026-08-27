import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { DatePickerInput } from "@shared/ui/inputs";
import { useBanUser } from "../../model/useBanUser";
import styles from "./BanUserModal.module.scss";
import { getReportReasonOptions } from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["moderation"]);

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
          <h1 className={styles.title}>{t("moderation:banUser.title")}</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:banUser.labels.reason")}
          </span>
          <SortDropDown
            options={getReportReasonOptions(t)}
            value={formik.values.reason}
            onSelect={(value) => formik.setFieldValue("reason", value)}
            variant="report"
          />
          {formik.submitCount > 0 && formik.errors.reason && (
            <div className="errorInput">{formik.errors.reason}</div>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:banUser.labels.expiresAt")}
          </span>
          <div className={styles.datePickerWrapper}>
            <DatePickerInput
              value={formik.values.expiresAt}
              onChange={(value) => formik.setFieldValue("expiresAt", value)}
              error={formik.errors.expiresAt}
              submit={formik.submitCount > 0}
              minValue={today(getLocalTimeZone())}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
            type="button"
          >
            {t("moderation:banUser.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("moderation:banUser.actions.submit")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

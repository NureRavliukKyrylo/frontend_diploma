import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import { useSendReport } from "../../model/useSendReport";
import styles from "./ReportModal.module.scss";
import {
  ModerationSubjectType,
  getModerationSubjectKey,
  getReportReasonOptions,
} from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["moderation"]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useSendReport({
    subjectType,
    subjectId,
    onSuccess: handleClose,
  });

  const subjectKey = getModerationSubjectKey(subjectType);
  const subjectLabel = t(`moderation:report.subjects.${subjectKey}`, {
    defaultValue: "Content",
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
            {t("moderation:report.title", { subject: subjectLabel })}
          </h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:report.labels.reason")}
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
            {t("moderation:report.labels.details")}
          </span>
          <TextAreaForm
            name="details"
            placeholder={t("moderation:report.placeholders.details")}
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
            type="button"
          >
            {t("moderation:report.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("moderation:report.actions.submit")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

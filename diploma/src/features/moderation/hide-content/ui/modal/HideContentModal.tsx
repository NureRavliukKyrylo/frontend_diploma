import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useHideContent } from "../../model/useHideContent";
import styles from "./HideContentModal.module.scss";
import {
  getReportReasonOptions,
  ModerationSubjectType,
} from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import { useTranslation } from "react-i18next";

interface HideContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
}

export const HideContentModal = ({
  isOpen,
  onClose,
  caseId,
  targetEntityType,
  targetEntityId,
}: HideContentModalProps) => {
  const { t } = useTranslation(["moderation"]);

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
          <h1 className={styles.title}>{t("moderation:hideContent.title")}</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:hideContent.labels.reason")}
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

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
            type="button"
          >
            {t("moderation:hideContent.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("moderation:hideContent.actions.submit")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

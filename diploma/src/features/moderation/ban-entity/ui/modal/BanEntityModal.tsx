import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useBanEntity } from "../../model/useBanEntity";
import styles from "./BanEntityModal.module.scss";
import {
  getReportReasonOptions,
  ModerationSubjectType,
} from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import { useTranslation } from "react-i18next";

interface BanEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetEntityType: keyof typeof ModerationSubjectType;
  targetEntityId: string;
}

export const BanEntityModal = ({
  isOpen,
  onClose,
  caseId,
  targetEntityType,
  targetEntityId,
}: BanEntityModalProps) => {
  const { t } = useTranslation(["moderation"]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useBanEntity({
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
          <h1 className={styles.title}>{t("moderation:banEntity.title")}</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:banEntity.labels.reason")}
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

        <p className={styles.description}>
          {t("moderation:banEntity.description")}
        </p>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
            type="button"
          >
            {t("moderation:banEntity.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("moderation:banEntity.actions.submit")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useBlockUser } from "../../model/useBlockUser";
import styles from "./BlockUserModal.module.scss";
import {
  getReportReasonOptions,
  ModerationSubjectType,
} from "@entities/report";
import { SortDropDown } from "@shared/ui/drop-down";
import { useTranslation } from "react-i18next";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  targetUserId: string;
  entityType: keyof typeof ModerationSubjectType;
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
  const { t } = useTranslation(["moderation"]);

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
          <h1 className={styles.title}>{t("moderation:blockUser.title")}</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:blockUser.labels.reason")}
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
          {t("moderation:blockUser.description")}
        </p>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
            type="button"
          >
            {t("moderation:blockUser.actions.cancel")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("moderation:blockUser.actions.submit")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import { motion } from "framer-motion";
import { useResolveCase } from "../../model/useResolveCase";
import styles from "./ResolveCaseModal.module.scss";
import { ApproveIcon, RejectIcon } from "@shared/assets/icons/actions";
import { useTranslation } from "react-i18next";

interface ResolveCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
  rejected: boolean;
  onChangeDecision: (rejected: boolean) => void;
}

export const ResolveCaseModal = ({
  isOpen,
  onClose,
  caseId,
  rejected,
  onChangeDecision,
}: ResolveCaseModalProps) => {
  const { t } = useTranslation(["moderation"]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useResolveCase({
    caseId,
    rejected,
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
          <h1 className={styles.title}>{t("moderation:resolveCase.title")}</h1>
        </div>

        <div className={styles.decisionGroup}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: rejected ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <BaseButtonWrapper
              className={`${styles.decisionButton} ${styles.rejectOption} ${
                rejected ? styles.active : ""
              }`}
              type="button"
              onClick={() => onChangeDecision(true)}
            >
              <RejectIcon className={styles.decisionIcon} />
              <span>{t("moderation:resolveCase.decisions.reject")}</span>
            </BaseButtonWrapper>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: !rejected ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <BaseButtonWrapper
              className={`${styles.decisionButton} ${styles.approveOption} ${
                !rejected ? styles.active : ""
              }`}
              type="button"
              onClick={() => onChangeDecision(false)}
            >
              <ApproveIcon className={styles.decisionIcon} />
              <span>{t("moderation:resolveCase.decisions.approve")}</span>
            </BaseButtonWrapper>
          </motion.div>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("moderation:resolveCase.labels.comment")}
          </span>
          <TextAreaForm
            name="comment"
            placeholder={
              rejected
                ? t("moderation:resolveCase.placeholders.rejectedComment")
                : t("moderation:resolveCase.placeholders.approvedComment")
            }
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={150}
            rows={4}
          />
          {formik.submitCount > 0 && formik.errors.comment && (
            <div className="errorInput">{formik.errors.comment}</div>
          )}
        </div>

        <div className={styles.footer}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <BaseButtonWrapper
              className={styles.cancelButton}
              onClick={handleClose}
              type="button"
            >
              {t("moderation:resolveCase.actions.cancel")}
            </BaseButtonWrapper>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <BaseButtonWrapper
              loading={isLoading}
              className={styles.submitButton}
              type="submit"
            >
              {t("moderation:resolveCase.actions.submit")}
            </BaseButtonWrapper>
          </motion.div>
        </div>
      </form>
    </BaseModal>
  );
};

import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import styles from "./ApproveOfferChangeModal.module.scss";
import { useApproveOfferChange } from "../../model/useApproveOfferChange";
import { useTranslation } from "react-i18next";

interface ApproveOfferChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  onSuccess?: () => void;
}

export const ApproveOfferChangeModal = ({
  isOpen,
  onClose,
  bookingId,
  onSuccess,
}: ApproveOfferChangeModalProps) => {
  const { t } = useTranslation(["timeBank"]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
    onSuccess?.();
  };

  const { formik, isLoading } = useApproveOfferChange({
    bookingId,
    onSuccess: handleSuccess,
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="620px"
      showClosed={false}
    >
      <form onSubmit={formik.handleSubmit} className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {t("timeBank:bookings.labels.acceptOfferChangeTitle")}
          </h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("timeBank:bookings.labels.comment")}
          </span>
          <TextAreaForm
            name="comment"
            placeholder={t(
              "timeBank:bookings.labels.acceptOfferChangePlaceholder",
            )}
            value={formik.values.comment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={300}
            rows={4}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className="errorInput">{formik.errors.comment}</div>
          )}
        </div>

        <div className={styles.footer}>
          <BaseButtonWrapper
            className={styles.cancelButton}
            onClick={handleClose}
            type="button"
          >
            {t("timeBank:bookings.labels.back")}
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            {t("timeBank:bookings.labels.approve")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

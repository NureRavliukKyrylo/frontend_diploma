import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import styles from "./CancelBookingModal.module.scss";
import { useCancelBooking } from "../../model/useCancelBooking";
import { useTranslation } from "react-i18next";

interface CancelBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export const CancelBookingModal = ({
  isOpen,
  onClose,
  bookingId,
}: CancelBookingModalProps) => {
  const { t } = useTranslation(["timeBank"]);
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useCancelBooking({
    bookingId,
    onSuccess: handleClose,
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
            {t("timeBank:bookings.labels.cancelTitle")}
          </h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("timeBank:bookings.labels.comment")}
          </span>
          <TextAreaForm
            name="comment"
            placeholder={t("timeBank:bookings.labels.cancelPlaceholder")}
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
            {t("timeBank:bookings.labels.cancelBooking")}
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

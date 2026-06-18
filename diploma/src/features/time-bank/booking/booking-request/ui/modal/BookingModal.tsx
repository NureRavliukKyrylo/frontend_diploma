import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import styles from "./BookingModal.module.scss";
import { useSendBooking } from "../../model/useSendBooking";
import { useTranslation } from "react-i18next";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerId: string;
  offerName: string;
}

export const BookingModal = ({
  isOpen,
  onClose,
  offerId,
  offerName,
}: BookingModalProps) => {
  const { t } = useTranslation(["timeBank"]);
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useSendBooking({
    offerId,
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
            {t("timeBank:bookings.labels.requestTitle", { offerName })}
          </h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>
            {t("timeBank:bookings.labels.comment")}
          </span>
          <TextAreaForm
            name="comment"
            placeholder={t("timeBank:bookings.labels.requestPlaceholder")}
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
            {t("timeBank:bookings.labels.cancel")}
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

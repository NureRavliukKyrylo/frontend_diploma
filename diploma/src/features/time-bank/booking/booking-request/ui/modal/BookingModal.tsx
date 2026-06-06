import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import styles from "./BookingModal.module.scss";
import { useSendBooking } from "../../model/useSendBooking";

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
          <h1 className={styles.title}>Request to book — {offerName}</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Comment</span>
          <TextAreaForm
            name="comment"
            placeholder="Leave a comment..."
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
          >
            Cancel
          </BaseButtonWrapper>
          <BaseButtonWrapper
            loading={isLoading}
            className={styles.submitButton}
            type="submit"
          >
            Send booking
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

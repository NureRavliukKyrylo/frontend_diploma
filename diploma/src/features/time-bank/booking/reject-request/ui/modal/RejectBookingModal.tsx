import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { TextAreaForm } from "@shared/ui/inputs";
import styles from "./RejectBookingModal.module.scss";
import { useRejectBooking } from "../../model/useRejectBooking";

interface RejectBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export const RejectBookingModal = ({
  isOpen,
  onClose,
  bookingId,
}: RejectBookingModalProps) => {
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const { formik, isLoading } = useRejectBooking({
    bookingId,
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
          <h1 className={styles.title}>Reject booking</h1>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Reason</span>
          <TextAreaForm
            name="reason"
            placeholder="Provide a reason for rejection..."
            value={formik.values.reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={300}
            rows={4}
          />
          {formik.touched.reason && formik.errors.reason && (
            <div className="errorInput">{formik.errors.reason}</div>
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
            Reject
          </BaseButtonWrapper>
        </div>
      </form>
    </BaseModal>
  );
};

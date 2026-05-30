import { BaseModal } from "@shared/ui/modals";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DisputeAttendanceModal.module.scss";
import { TextAreaForm } from "@shared/ui/inputs";
import { useDisputeAttendance } from "../../model/useDisputeAttendance";

interface DisputeModalProps {
  eventId: string;
  attendanceId: string;
  eventTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DisputeAttendanceModal = ({
  eventId,
  attendanceId,
  eventTitle,
  isOpen,
  onClose,
}: DisputeModalProps) => {
  const date = new Date();

  const handleClose = () => {
    formik.resetForm();
    mutation.reset();
    onClose();
  };

  const { formik, isLoading, mutation } = useDisputeAttendance(
    eventId,
    attendanceId,
    date,
    handleClose,
  );

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose} maxWidth="640px">
      <form
        onSubmit={formik.handleSubmit}
        className={styles.disputeAttendanceModal}
      >
        <h2>Dispute — {eventTitle}</h2>
        <TextAreaForm
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Describe the reason for your dispute..."
        />
        {formik.touched.comment && formik.errors.comment && (
          <p className="errorInput">{formik.errors.comment}</p>
        )}
        <BaseButtonWrapper loading={isLoading} type="submit">
          Submit Dispute
        </BaseButtonWrapper>
      </form>
    </BaseModal>
  );
};

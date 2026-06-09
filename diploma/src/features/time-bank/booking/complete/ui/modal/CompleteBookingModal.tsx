import { ConfirmationModal } from "@shared/ui/modals";
import { useCompleteBooking } from "../../model/useCompleteBooking";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./CompleteBookingModal.module.scss";

interface CompleteBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}

export const CompleteBookingModal = ({
  isOpen,
  onClose,
  bookingId,
}: CompleteBookingModalProps) => {
  const { complete, isLoading, errorMessage } = useCompleteBooking({
    bookingId,
    onSuccess: onClose,
  });

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onCancel={onClose}
      image={DeleteModal}
      confirmButtonClassName={styles.confirmButtonComplete}
      imageClassName={styles.imageDelete}
      onConfirm={complete}
      title="Complete booking"
      text="Are you sure you want to mark this booking as complete? This action cannot be undone."
      confirmText="Complete"
      cancelText="Cancel"
      error={errorMessage}
      isLoading={isLoading}
    />
  );
};

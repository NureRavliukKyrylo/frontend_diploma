import { ConfirmationModal } from "@shared/ui/modals";
import { useCompleteBooking } from "../../model/useCompleteBooking";

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

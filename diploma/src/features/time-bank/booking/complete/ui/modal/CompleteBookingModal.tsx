import { ConfirmationModal } from "@shared/ui/modals";
import { useCompleteBooking } from "../../model/useCompleteBooking";
import { DeleteModal } from "@shared/assets/images/actions";
import styles from "./CompleteBookingModal.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["timeBank"]);
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
      title={t("timeBank:bookings.labels.completeTitle")}
      text={t("timeBank:bookings.labels.completeDescription")}
      confirmText={t("timeBank:bookings.labels.complete")}
      cancelText={t("timeBank:bookings.labels.cancel")}
      error={errorMessage}
      isLoading={isLoading}
    />
  );
};

import { useState } from "react";
import { RejectIcon } from "@shared/assets/icons/actions";
import styles from "./RejectBookingButton.module.scss";
import { RejectBookingModal } from "../modal/RejectBookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface RejectBookingButtonProps {
  bookingId: string;
}

export const RejectBookingButton = ({
  bookingId,
}: RejectBookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.rejectButton}
        onClick={() => setIsOpen(true)}
      >
        <RejectIcon className={styles.icon} />
        Reject
      </BaseButtonWrapper>
      <RejectBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

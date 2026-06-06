import { useState } from "react";
import { ApproveIcon } from "@shared/assets/icons/actions";
import styles from "./CompleteBookingButton.module.scss";
import { CompleteBookingModal } from "../modal/CompleteBookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface CompleteBookingButtonProps {
  bookingId: string;
}

export const CompleteBookingButton = ({
  bookingId,
}: CompleteBookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        <ApproveIcon className={styles.icon} />
        Complete
      </BaseButtonWrapper>
      <CompleteBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

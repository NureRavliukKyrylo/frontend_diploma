import { useState } from "react";
import styles from "./CancelBookingButton.module.scss";
import { CancelBookingModal } from "../modal/CancelBookingModal";

interface CancelBookingButtonProps {
  bookingId: string;
}

export const CancelBookingButton = ({
  bookingId,
}: CancelBookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.button} onClick={() => setIsOpen(true)}>
        Cancel booking
      </button>
      <CancelBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

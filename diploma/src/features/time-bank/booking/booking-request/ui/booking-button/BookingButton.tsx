import { useState } from "react";
import styles from "./BookingButton.module.scss";
import { BookingModal } from "../modal/BookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface BookingButtonProps {
  offerId: string;
  offerName: string;
}

export const BookingButton = ({ offerId, offerName }: BookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.button}
        onClick={() => setIsOpen(true)}
      >
        Book now
      </BaseButtonWrapper>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        offerId={offerId}
        offerName={offerName}
      />
    </>
  );
};

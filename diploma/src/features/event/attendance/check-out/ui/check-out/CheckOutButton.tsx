import { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./CheckInButton.module.scss";
import { CheckOutModal } from "../modal/CheckOutModal";

interface CheckOutButtonProps {
  eventId: string;
  eventTitle: string;
}

export const CheckOutButton = ({
  eventId,
  eventTitle,
}: CheckOutButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.checkInButton}
        onClick={() => setIsOpen(true)}
      >
        Check in
      </BaseButtonWrapper>
      <CheckOutModal
        eventId={eventId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventTitle={eventTitle}
      />
    </>
  );
};

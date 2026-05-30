import { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./CheckInButton.module.scss";
import { CheckInModal } from "../modal/CheckInModal";

interface CheckInButtonProps {
  eventId: string;
  eventTitle: string;
}

export const CheckInButton = ({ eventId, eventTitle }: CheckInButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.checkInButton}
        onClick={() => setIsOpen(true)}
      >
        Check in
      </BaseButtonWrapper>
      <CheckInModal
        eventId={eventId}
        eventTitle={eventTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

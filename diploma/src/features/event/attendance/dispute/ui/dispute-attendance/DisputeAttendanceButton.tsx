import { useState } from "react";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./DisputeAttendanceButton.module.scss";
import { DisputeAttendanceModal } from "../modal/DisputeAttendanceModal";

interface DisputeButtonProps {
  eventId: string;
  attendanceId: string;
  eventTitle: string;
}

export const DisputeAttendanceButton = ({
  eventId,
  attendanceId,
  eventTitle,
}: DisputeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <BaseButtonWrapper
        className={styles.disputeAttendanceButton}
        onClick={() => setIsOpen(true)}
      >
        Dispute
      </BaseButtonWrapper>
      <DisputeAttendanceModal
        eventId={eventId}
        attendanceId={attendanceId}
        eventTitle={eventTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <BaseButtonWrapper
          className={styles.disputeAttendanceButton}
          onClick={() => setIsOpen(true)}
        >
          Dispute
        </BaseButtonWrapper>
      </motion.div>
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

import { useState } from "react";
import { RejectIcon } from "@shared/assets/icons/actions";
import styles from "./RejectBookingButton.module.scss";
import { RejectBookingModal } from "../modal/RejectBookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";

interface RejectBookingButtonProps {
  bookingId: string;
}

export const RejectBookingButton = ({
  bookingId,
}: RejectBookingButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={styles.rejectButton}
          onClick={() => setIsOpen(true)}
        >
          <RejectIcon className={styles.icon} />
          Reject
        </BaseButtonWrapper>
      </motion.div>
      <RejectBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

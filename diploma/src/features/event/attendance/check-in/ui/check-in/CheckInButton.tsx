import { useState } from "react";
import { motion } from "framer-motion";
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
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <BaseButtonWrapper
          className={styles.checkInButton}
          onClick={() => setIsOpen(true)}
        >
          Check in
        </BaseButtonWrapper>
      </motion.div>
      <CheckInModal
        eventId={eventId}
        eventTitle={eventTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

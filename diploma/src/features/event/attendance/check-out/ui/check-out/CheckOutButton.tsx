import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./CheckOutButton.module.scss";
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
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <BaseButtonWrapper
          className={styles.checkOutButton}
          onClick={() => setIsOpen(true)}
        >
          Check out
        </BaseButtonWrapper>
      </motion.div>
      <CheckOutModal
        eventId={eventId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eventTitle={eventTitle}
      />
    </>
  );
};

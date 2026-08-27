import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./CheckInButton.module.scss";
import { CheckInModal } from "../modal/CheckInModal";
import { useTranslation } from "react-i18next";

interface CheckInButtonProps {
  eventId: string;
  eventTitle: string;
}

export const CheckInButton = ({ eventId, eventTitle }: CheckInButtonProps) => {
  const { t } = useTranslation(["event"]);
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
          {t("event:checkIn.button")}
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

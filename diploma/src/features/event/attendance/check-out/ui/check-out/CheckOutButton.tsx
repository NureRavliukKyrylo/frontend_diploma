import { useState } from "react";
import { motion } from "framer-motion";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./CheckOutButton.module.scss";
import { CheckOutModal } from "../modal/CheckOutModal";
import { useTranslation } from "react-i18next";

interface CheckOutButtonProps {
  eventId: string;
  eventTitle: string;
}

export const CheckOutButton = ({
  eventId,
  eventTitle,
}: CheckOutButtonProps) => {
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
          className={styles.checkOutButton}
          onClick={() => setIsOpen(true)}
        >
          {t("event:checkOut.button")}
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

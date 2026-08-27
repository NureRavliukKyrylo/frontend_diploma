import { useState } from "react";
import styles from "./BookingButton.module.scss";
import { BookingModal } from "../modal/BookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface BookingButtonProps {
  offerId: string;
  offerName: string;
}

export const BookingButton = ({ offerId, offerName }: BookingButtonProps) => {
  const { t } = useTranslation(["timeBank"]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <BaseButtonWrapper
          className={styles.button}
          onClick={() => setIsOpen(true)}
        >
          {t("timeBank:bookings.labels.bookNow")}
        </BaseButtonWrapper>
      </motion.div>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        offerId={offerId}
        offerName={offerName}
      />
    </>
  );
};

import { useState } from "react";
import { ApproveIcon } from "@shared/assets/icons/actions";
import styles from "./CompleteBookingButton.module.scss";
import { CompleteBookingModal } from "../modal/CompleteBookingModal";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CompleteBookingButtonProps {
  bookingId: string;
  variant?: "default" | "myBooking";
}

export const CompleteBookingButton = ({
  bookingId,
  variant = "default",
}: CompleteBookingButtonProps) => {
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
          className={`${styles.button} ${variant === "myBooking" ? styles.myBooking : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <ApproveIcon className={styles.icon} />
          {t("timeBank:bookings.labels.complete")}
        </BaseButtonWrapper>
      </motion.div>
      <CompleteBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

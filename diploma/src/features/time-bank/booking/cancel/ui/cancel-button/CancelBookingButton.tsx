import { useState } from "react";
import styles from "./CancelBookingButton.module.scss";
import { CancelBookingModal } from "../modal/CancelBookingModal";
import { RejectIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface CancelBookingButtonProps {
  bookingId: string;
  variant?: "default" | "prominent";
}

export const CancelBookingButton = ({
  bookingId,
  variant = "default",
}: CancelBookingButtonProps) => {
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
          className={`${styles.button} ${variant === "prominent" ? styles.prominent : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <RejectIcon className={styles.icon} />
          {variant === "default"
            ? t("timeBank:bookings.labels.cancelBooking")
            : t("timeBank:bookings.labels.cancel")}
        </BaseButtonWrapper>
      </motion.div>
      <CancelBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

import { useState } from "react";
import styles from "./DisputeBookingButton.module.scss";
import { DisputeBookingModal } from "../modal/DisputeBookingModal";
import { DisputeIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface DisputeBookingButtonProps {
  bookingId: string;
  variant?: "default" | "prominent";
}

export const DisputeBookingButton = ({
  bookingId,
  variant = "default",
}: DisputeBookingButtonProps) => {
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
          <DisputeIcon className={styles.icon} />
          {variant === "default"
            ? t("timeBank:bookings.labels.disputeBooking")
            : t("timeBank:bookings.labels.dispute")}
        </BaseButtonWrapper>
      </motion.div>
      <DisputeBookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
      />
    </>
  );
};

import { useState } from "react";
import styles from "./RejectOfferChangeButton.module.scss";
import { RejectIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RejectOfferChangeModal } from "../modal/RejectOfferChangeModal";

interface RejectBookingButtonProps {
  bookingId: string;
  onSuccess?: () => void;
}

export const RejectOfferChangeButton = ({
  bookingId,
  onSuccess,
}: RejectBookingButtonProps) => {
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
          className={styles.declineButton}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <RejectIcon className={styles.icon} />
          {t("timeBank:bookings.labels.reject")}
        </BaseButtonWrapper>
      </motion.div>
      <RejectOfferChangeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
        onSuccess={onSuccess}
      />
    </>
  );
};

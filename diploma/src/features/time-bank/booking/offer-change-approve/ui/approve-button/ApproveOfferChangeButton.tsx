import { useState } from "react";
import styles from "./ApproveOfferChangeButton.module.scss";
import { ApproveIcon } from "@shared/assets/icons/actions";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ApproveOfferChangeModal } from "../modal/ApproveOfferChangeModal";

interface ApproveBookingButtonProps {
  bookingId: string;
  onSuccess?: () => void;
}

export const ApproveOfferChangeButton = ({
  bookingId,
  onSuccess,
}: ApproveBookingButtonProps) => {
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
          className={styles.acceptButton}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <ApproveIcon className={styles.icon} />
          {t("timeBank:bookings.labels.approve")}
        </BaseButtonWrapper>
      </motion.div>
      <ApproveOfferChangeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        bookingId={bookingId}
        onSuccess={onSuccess}
      />
    </>
  );
};

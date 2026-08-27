import { useApproveBooking } from "../model/useApproveBooking";
import { ApproveIcon } from "@shared/assets/icons/actions";
import styles from "./ApproveBookingButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface ApproveBookingButtonProps {
  bookingId: string;
  offerId: string;
  onSuccess?: () => void;
}

export const ApproveBookingButton = ({
  bookingId,
  offerId,
  onSuccess,
}: ApproveBookingButtonProps) => {
  const { t } = useTranslation(["timeBank"]);
  const { approve, isLoading } = useApproveBooking({
    bookingId,
    onSuccess,
    offerId,
  });

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <BaseButtonWrapper
        className={styles.approveButton}
        onClick={() => approve()}
        disabled={isLoading}
      >
        <ApproveIcon className={styles.icon} />
        {t("timeBank:bookings.labels.approve")}
      </BaseButtonWrapper>
    </motion.div>
  );
};

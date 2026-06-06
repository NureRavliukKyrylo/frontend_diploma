import { useApproveBooking } from "../model/useApproveBooking";
import { ApproveIcon } from "@shared/assets/icons/actions";
import styles from "./ApproveBookingButton.module.scss";
import { BaseButtonWrapper } from "@shared/ui/buttons";

interface ApproveBookingButtonProps {
  bookingId: string;
  onSuccess: () => void;
}

export const ApproveBookingButton = ({
  bookingId,
  onSuccess,
}: ApproveBookingButtonProps) => {
  const { approve, isLoading } = useApproveBooking({ bookingId, onSuccess });

  return (
    <BaseButtonWrapper
      className={styles.approveButton}
      onClick={() => approve()}
      disabled={isLoading}
    >
      <ApproveIcon className={styles.icon} />
      Approve
    </BaseButtonWrapper>
  );
};

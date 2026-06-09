import type { OfferJoined } from "@entities/offer/model";
import styles from "./BookingBottomContent.module.scss";
import {
  CancelBookingButton,
  CompleteBookingButton,
} from "@features/time-bank";

export const getBottomContent = (offer: OfferJoined) => {
  const {
    progressStatus,
    canCancel,
    canComplete,
    isOnline,
    locationInfo,
    myBookingId: id,
  } = offer;

  if (progressStatus === "pending" && canCancel) {
    return (
      <div className={styles.bottomContent}>
        <p>Your booking is awaiting confirmation.</p>
        <CancelBookingButton bookingId={id} />
      </div>
    );
  }

  if (progressStatus === "inProgress") {
    if (!isOnline && locationInfo?.address) {
      return (
        <div className={styles.bottomContent}>
          <p>
            This offer is scheduled at{" "}
            <span className={styles.address}>{locationInfo.address}</span>
          </p>
          <div className={styles.actions}>
            {canComplete && <CompleteBookingButton bookingId={id} />}
            {canCancel && <CancelBookingButton bookingId={id} />}
          </div>
        </div>
      );
    }

    if (isOnline) {
      return (
        <div className={styles.bottomContent}>
          <p>When you finish, mark the booking as complete.</p>
          <div className={styles.actions}>
            {canComplete && <CompleteBookingButton bookingId={id} />}
            {canCancel && <CancelBookingButton bookingId={id} />}
          </div>
        </div>
      );
    }
  }

  if (progressStatus === "completed") {
    return (
      <div className={styles.bottomContent}>
        <p>You've successfully completed this offer</p>
      </div>
    );
  }

  return null;
};

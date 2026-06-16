import type { OfferJoined } from "@entities/offer/model";
import styles from "./BookingBottomContent.module.scss";
import {
  CancelBookingButton,
  CompleteBookingButton,
} from "@features/time-bank";

export const getBottomContent = (offer: OfferJoined) => {
  const {
    myBookingStatus,
    canCancel,
    canComplete,
    isOnline,
    locationInfo,
    myBookingId: id,
  } = offer;

  if (myBookingStatus === "Pending" && canCancel) {
    return (
      <div className={styles.bottomContent}>
        <p>Your booking is awaiting confirmation.</p>
        <CancelBookingButton bookingId={id} />
      </div>
    );
  }

  if (myBookingStatus === "Reserved") {
    if (!isOnline && locationInfo?.address) {
      return (
        <div className={styles.bottomContent}>
          <p>
            This offer is scheduled at{" "}
            <span className={styles.address}>{locationInfo.address}</span>
          </p>
          <div className={styles.actions}>
            {canComplete && (
              <CompleteBookingButton variant="myBooking" bookingId={id} />
            )}
            {canCancel && <CancelBookingButton bookingId={id} />}
          </div>
        </div>
      );
    }

    if (isOnline) {
      return (
        <div className={styles.bottomContent}>
          <p>When you finish, mark the booking as completed.</p>
          <div className={styles.actions}>
            {canComplete && (
              <CompleteBookingButton variant="myBooking" bookingId={id} />
            )}
            {canCancel && <CancelBookingButton bookingId={id} />}
          </div>
        </div>
      );
    }
  }

  if (myBookingStatus === "CompletionRequested") {
    return (
      <div className={styles.bottomContent}>
        <p>Waiting for the organizer to confirm completion.</p>
      </div>
    );
  }

  if (myBookingStatus === "Completed") {
    return (
      <div className={styles.bottomContent}>
        <p>You've successfully completed this offer.</p>
      </div>
    );
  }

  if (myBookingStatus === "Cancelled") {
    return (
      <div className={styles.bottomContent}>
        <p>This booking has been cancelled.</p>
      </div>
    );
  }

  return null;
};

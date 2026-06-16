import type { OfferJoined } from "@entities/offer/model";
import styles from "./BookingBottomContent.module.scss";
import type { TFunction } from "i18next";
import {
  CancelBookingButton,
  CompleteBookingButton,
} from "@features/time-bank";

export const getBottomContent = (offer: OfferJoined, t: TFunction) => {
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
        <p>{t("timeBank:bookings.bottomContent.pending")}</p>
        <CancelBookingButton bookingId={id} />
      </div>
    );
  }

  if (myBookingStatus === "Reserved") {
    if (!isOnline && locationInfo?.address) {
      return (
        <div className={styles.bottomContent}>
          <p>
            {t("timeBank:bookings.bottomContent.scheduledAt")}{" "}
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
          <p>{t("timeBank:bookings.bottomContent.onlineFinish")}</p>
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
        <p>{t("timeBank:bookings.bottomContent.completionRequested")}</p>
      </div>
    );
  }

  if (myBookingStatus === "Completed") {
    return (
      <div className={styles.bottomContent}>
        <p>{t("timeBank:bookings.bottomContent.completed")}</p>
      </div>
    );
  }

  if (myBookingStatus === "Cancelled") {
    return (
      <div className={styles.bottomContent}>
        <p>{t("timeBank:bookings.bottomContent.cancelled")}</p>
      </div>
    );
  }

  return null;
};

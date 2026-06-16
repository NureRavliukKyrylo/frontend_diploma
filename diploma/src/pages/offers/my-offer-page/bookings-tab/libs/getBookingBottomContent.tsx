import type { OfferBooking } from "@entities/offer";
import {
  ApproveBookingButton,
  CancelBookingButton,
  CompleteBookingButton,
  RejectBookingButton,
} from "@features/time-bank";

export const getBookingBottomContent = (booking: OfferBooking) => {
  const { canComplete, canCancel, canApprove, canReject, id, offerId } =
    booking;

  return (
    <>
      {(canApprove || canReject) && (
        <>
          {canApprove && (
            <ApproveBookingButton bookingId={id} offerId={offerId} />
          )}
          {canReject && <RejectBookingButton bookingId={id} />}
        </>
      )}
      {canComplete && (
        <CompleteBookingButton bookingId={id} variant="myBooking" />
      )}
      {canCancel && <CancelBookingButton bookingId={id} />}
    </>
  );
};

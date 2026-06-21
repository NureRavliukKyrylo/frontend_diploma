import type { OfferBooking } from "@entities/offer";
import {
  ApproveBookingButton,
  CompleteBookingButton,
  DisputeBookingButton,
  RejectBookingButton,
} from "@features/time-bank";

export const getBookingBottomContent = (booking: OfferBooking) => {
  const { canComplete, canDispute, canApprove, canReject, id, offerId } =
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
      {canDispute && <DisputeBookingButton bookingId={id} />}
    </>
  );
};

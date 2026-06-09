import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { approveBooking } from "../api/approveBookingApi";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";

interface UseApproveBookingProps {
  bookingId: string;
  offerId: string;
  onSuccess?: () => void;
}

export const useApproveBooking = ({
  bookingId,
  offerId,
  onSuccess,
}: UseApproveBookingProps) => {
  const mutation = useMutation({
    mutationFn: () => approveBooking(bookingId),
    onSuccess: () => {
      addToast({
        title: "Booking approved",
        description: "The booking has been approved",
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: offerKeys.allBookings(offerId),
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to approve",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return { approve: mutation.mutate, isLoading: mutation.isPending };
};

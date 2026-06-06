import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { approveBooking } from "../api/approveBookingApi";

interface UseApproveBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useApproveBooking = ({
  bookingId,
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
      onSuccess();
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

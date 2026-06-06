import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { completeBooking } from "../api/completeBookingApi";

interface UseCompleteBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useCompleteBooking = ({
  bookingId,
  onSuccess,
}: UseCompleteBookingProps) => {
  const mutation = useMutation({
    mutationFn: () => completeBooking(bookingId),
    onSuccess: () => {
      addToast({
        title: "Booking completed",
        description: "The booking has been marked as complete",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to complete",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    complete: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

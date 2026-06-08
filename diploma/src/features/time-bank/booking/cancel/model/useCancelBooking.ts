import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { cancelBooking, type CancelBookingDto } from "../api/cancelBookingApi";
import { cancelBookingSchema } from "../libs/cancelBookingSchema";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";

interface UseCancelBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useCancelBooking = ({
  bookingId,
  onSuccess,
}: UseCancelBookingProps) => {
  const mutation = useMutation({
    mutationFn: (data: CancelBookingDto) => cancelBooking(bookingId, data),
    onSuccess: () => {
      addToast({
        title: "Booking cancelled",
        description: "The booking has been cancelled",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to cancel",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: cancelBookingSchema,
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

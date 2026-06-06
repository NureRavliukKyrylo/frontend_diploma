import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { rejectSchema } from "../libs/rejectSchema";
import { rejectBooking, type RejectBookingDto } from "../api/rejectBookingApi";

interface UseRejectBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useRejectBooking = ({
  bookingId,
  onSuccess,
}: UseRejectBookingProps) => {
  const mutation = useMutation({
    mutationFn: (data: RejectBookingDto) => rejectBooking(bookingId, data),
    onSuccess: () => {
      addToast({
        title: "Booking rejected",
        description: "The booking has been rejected",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to reject",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { reason: "" },
    validationSchema: rejectSchema,
    onSubmit: (values) => {
      mutation.mutate({ reason: values.reason });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

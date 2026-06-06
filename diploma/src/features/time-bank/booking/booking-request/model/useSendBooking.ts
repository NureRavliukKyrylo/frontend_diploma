import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendBooking, type BookingDto } from "../api/bookingApi";
import { bookingSchema } from "../libs/bookingSchema";

interface UseSendBookingProps {
  offerId: string;
  onSuccess: () => void;
}

export const useSendBooking = ({ offerId, onSuccess }: UseSendBookingProps) => {
  const mutation = useMutation({
    mutationFn: (data: BookingDto) => sendBooking(offerId, data),
    onSuccess: () => {
      addToast({
        title: "Booking sent",
        description: "Your booking request has been sent",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Booking failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: bookingSchema,
    onSubmit: (values) => {
      mutation.mutate({
        ...values,
      });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { sendBooking, type BookingDto } from "../api/bookingApi";
import { getBookingSchema } from "../libs/bookingSchema";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseSendBookingProps {
  offerId: string;
  onSuccess: () => void;
}

export const useSendBooking = ({ offerId, onSuccess }: UseSendBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: BookingDto) => sendBooking(offerId, data),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.sendSuccessTitle"),
        description: t("timeBank:bookings.toasts.sendSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.sendName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: getBookingSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ ...values });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

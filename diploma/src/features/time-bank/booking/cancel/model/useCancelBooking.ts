import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { cancelBooking, type CancelBookingDto } from "../api/cancelBookingApi";
import { getCancelBookingSchema } from "../libs/cancelBookingSchema";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseCancelBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useCancelBooking = ({
  bookingId,
  onSuccess,
}: UseCancelBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: CancelBookingDto) => cancelBooking(bookingId, data),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.cancelSuccessTitle"),
        description: t("timeBank:bookings.toasts.cancelSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.cancelName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: getCancelBookingSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { getRejectSchema } from "../libs/rejectSchema";
import { rejectBooking, type RejectBookingDto } from "../api/rejectBookingApi";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseRejectBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useRejectBooking = ({
  bookingId,
  onSuccess,
}: UseRejectBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: RejectBookingDto) => rejectBooking(bookingId, data),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.rejectSuccessTitle"),
        description: t("timeBank:bookings.toasts.rejectSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.rejectName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { reason: "" },
    validationSchema: getRejectSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ reason: values.reason });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

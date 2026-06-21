import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  disputeBooking,
  type DisputeBookingDto,
} from "../api/disputeBookingApi";
import { getDisputeBookingSchema } from "../libs/disputeBookingSchema";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseDisputeBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useDisputeBooking = ({
  bookingId,
  onSuccess,
}: UseDisputeBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: DisputeBookingDto) => disputeBooking(bookingId, data),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.disputeSuccessTitle"),
        description: t("timeBank:bookings.toasts.disputeSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.disputeName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: getDisputeBookingSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

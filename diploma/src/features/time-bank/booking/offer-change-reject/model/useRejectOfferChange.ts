import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  rejectOfferChange,
  type RejectOfferChangeDto,
} from "../api/rejectOfferChangeApi";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";
import { getRejectOfferChangeSchema } from "../libs/rejectOfferChangeSchema";

interface UseRejectOfferChangeProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useRejectOfferChange = ({
  bookingId,
  onSuccess,
}: UseRejectOfferChangeProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: RejectOfferChangeDto) =>
      rejectOfferChange(bookingId, data),
    onSuccess: async () => {
      addToast({
        title: t("timeBank:bookings.toasts.offerChangeRejectSuccessTitle"),
        description: t("timeBank:bookings.toasts.offerChangeRejectSuccessDesc"),
        color: "success",
      });
      try {
        await onSuccess?.();
      } catch {}
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.offerChangeRejectName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: getRejectOfferChangeSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

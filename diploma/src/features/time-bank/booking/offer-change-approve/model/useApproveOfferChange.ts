import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  approveOfferChange,
  type ApproveOfferChangeDto,
} from "../api/approveOfferChangeApi";
import { getApproveOfferChangeSchema } from "../libs/approveOfferChangeSchema";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseApproveOfferChangeProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useApproveOfferChange = ({
  bookingId,
  onSuccess,
}: UseApproveOfferChangeProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: (data: ApproveOfferChangeDto) =>
      approveOfferChange(bookingId, data),
    onSuccess: async () => {
      addToast({
        title: t("timeBank:bookings.toasts.offerChangeAcceptSuccessTitle"),
        description: t("timeBank:bookings.toasts.offerChangeAcceptSuccessDesc"),
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
          action: t("timeBank:bookings.actions.offerChangeAcceptName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const formik = useFormik({
    initialValues: { comment: "" },
    validationSchema: getApproveOfferChangeSchema(t),
    onSubmit: (values) => {
      mutation.mutate({ comment: values.comment });
    },
  });

  return { formik, isLoading: mutation.isPending };
};

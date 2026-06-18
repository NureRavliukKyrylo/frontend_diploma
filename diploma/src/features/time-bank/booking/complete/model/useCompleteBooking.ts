import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { completeBooking } from "../api/completeBookingApi";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseCompleteBookingProps {
  bookingId: string;
  onSuccess: () => void;
}

export const useCompleteBooking = ({
  bookingId,
  onSuccess,
}: UseCompleteBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: () => completeBooking(bookingId),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.completeSuccessTitle"),
        description: t("timeBank:bookings.toasts.completeSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.completeName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    complete: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

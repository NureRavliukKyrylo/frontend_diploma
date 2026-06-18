import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { approveBooking } from "../api/approveBookingApi";
import { queryClient } from "@shared/api";
import { offerKeys } from "@entities/offer";
import { useTranslation } from "react-i18next";

interface UseApproveBookingProps {
  bookingId: string;
  offerId: string;
  onSuccess?: () => void;
}

export const useApproveBooking = ({
  bookingId,
  offerId,
  onSuccess,
}: UseApproveBookingProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: () => approveBooking(bookingId),
    onSuccess: () => {
      addToast({
        title: t("timeBank:bookings.toasts.approveSuccessTitle"),
        description: t("timeBank:bookings.toasts.approveSuccessDesc"),
        color: "success",
      });
      queryClient.invalidateQueries({
        queryKey: offerKeys.allBookings(offerId),
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:bookings.actions.approveName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return { approve: mutation.mutate, isLoading: mutation.isPending };
};

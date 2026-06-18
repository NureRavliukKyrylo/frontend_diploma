import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { deactivateOffer } from "../api/deactivateOfferApi";
import { offerKeys } from "@entities/offer";
import { queryClient } from "@shared/api";
import { useTranslation } from "react-i18next";

interface UseDeactivateOfferProps {
  offerId: string;
  onSuccess: () => void;
}

export const useDeactivateOffer = ({
  offerId,
  onSuccess,
}: UseDeactivateOfferProps) => {
  const { t } = useTranslation(["timeBank", "common"]);

  const mutation = useMutation({
    mutationFn: () => deactivateOffer(offerId),
    onSuccess: () => {
      addToast({
        title: t("timeBank:deactivateOffer.toasts.successTitle"),
        description: t("timeBank:deactivateOffer.toasts.successDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: offerKeys.all() });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("timeBank:deactivateOffer.actions.actionName"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    deactivate: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

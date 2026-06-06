import { useMutation } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { deactivateOffer } from "../api/deactivateOfferApi";

interface UseDeactivateOfferProps {
  offerId: string;
  onSuccess: () => void;
}

export const useDeactivateOffer = ({
  offerId,
  onSuccess,
}: UseDeactivateOfferProps) => {
  const mutation = useMutation({
    mutationFn: () => deactivateOffer(offerId),
    onSuccess: () => {
      addToast({
        title: "Offer deactivated",
        description: "The offer has been deactivated",
        color: "success",
      });
      onSuccess();
    },
    onError: (error: unknown) => {
      addToast({
        title: "Failed to deactivate",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  return {
    deactivate: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

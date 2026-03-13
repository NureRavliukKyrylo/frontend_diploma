import { useMutation } from "@tanstack/react-query";
import { enableTwoFactor } from "../api/twoFactorApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useUserProfileStore } from "@entities/user";

export const useEnableTwoFactor = () => {
  const { openVerificationModal } = useUserProfileStore();

  const mutation = useMutation({
    mutationFn: enableTwoFactor,
    onSuccess: () => {
      addToast({
        title: "Enable Two Factor request success",
        description: "You have sent enabling two factor request successfully",
        color: "success",
      });
      openVerificationModal("twoFactorEnable");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Enable Two Factor request Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    enableTwoFactor: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

import { useMutation } from "@tanstack/react-query";
import { disableTwoFactor } from "../api/twoFactorApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs";
import { useUserProfileStore } from "@entities/user";

export const useDisableTwoFactor = () => {
  const { openVerificationModal } = useUserProfileStore();

  const mutation = useMutation({
    mutationFn: disableTwoFactor,
    onSuccess: () => {
      addToast({
        title: "Disable Two Factor request success",
        description: "You have sent disabling two factor request successfully",
        color: "success",
      });
      openVerificationModal("twoFactorDisable");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Disable Two Factor request Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    disableTwoFactor: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

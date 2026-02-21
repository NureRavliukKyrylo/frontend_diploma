import { useMutation } from "@tanstack/react-query";
import { sendChangePasswordRequest } from "../api/sendChangePasswordRequestApi";
import { addToast } from "@heroui/react";
import { useUserProfileStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs";

export const useSendChangePasswordRequest = () => {
  const { openVerificationModal } = useUserProfileStore();

  const mutation = useMutation({
    mutationFn: sendChangePasswordRequest,
    onSuccess: () => {
      addToast({
        title: "Change password request success",
        description: "You have sent changing password request successfully",
        color: "success",
      });
      openVerificationModal("changePassword");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Change password request Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    sendPassword: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

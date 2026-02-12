import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";

import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs";

export const useLogout = (onSuccessCallback?: () => void) => {

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {

      addToast({
        title: "Logout Success",
        description: "You have done logout successfully",
        color: "success",
      });

      onSuccessCallback?.();
      router.navigate({ to: AuthRoutes.root });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);
      addToast({
        title: "Logout Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    handleLogout: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

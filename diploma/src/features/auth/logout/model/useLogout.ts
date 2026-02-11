import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { useErrorStore } from "@shared/config/stores";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs";

export const useLogout = (onSuccessCallback?: () => void) => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setServerError("logoutError", null);

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
      setServerError("logoutError", errorMessage);
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
    error: mutation.error,
  };
};

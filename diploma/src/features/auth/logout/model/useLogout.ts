import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import { useUserStore } from "@entities/user";

export const useLogout = (onSuccessCallback?: () => void, showToast = true) => {
  const router = useRouter();
  const { clearUserInfo } = useUserStore();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      localStorage.clear();
      clearUserInfo();

      await router.invalidate();

      if (showToast) {
        addToast({
          title: "Logout Success",
          description: "You have done logout successfully",
          color: "success",
        });
      }

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

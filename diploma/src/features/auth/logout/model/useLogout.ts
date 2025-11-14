import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { useErrorStore } from "@shared/config";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";

export const useLogout = (onSuccessCallback?: () => void) => {
  const setServerError = useErrorStore((state) => state.setServerError);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      setServerError("logoutError", null);

      console.log("Logout success:", data);

      addToast({
        title: "Logout Success",
        description: "You have done logout successfully",
        color: "success",
      });

      onSuccessCallback?.();
      router.navigate({ to: AuthRoutes.root });
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again";
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

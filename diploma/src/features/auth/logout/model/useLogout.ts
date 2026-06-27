import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/logoutApi";
import { addToast } from "@heroui/react";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";
import { queryClient } from "@shared/api";
import {
  useAuthStore,
  useUserProfileStore,
  useUserStore,
} from "@entities/user";
import { useTranslation } from "react-i18next";

export const useLogout = (onSuccessCallback?: () => void, showToast = true) => {
  const { t } = useTranslation(["auth", "common"]);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      useAuthStore.persist.clearStorage();
      useUserStore.persist.clearStorage();
      useUserProfileStore.persist.clearStorage();

      if (showToast) {
        addToast({
          title: t("logout.successTitle"),
          description: t("logout.successDescription"),
          color: "success",
        });
      }

      onSuccessCallback?.();
      router.navigate({ to: AuthRoutes.root });
      await router.invalidate();
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", { action: t("logout.action") }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    handleLogout: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { addToast } from "@heroui/react";
import { useRouter, useSearch } from "@tanstack/react-router";
import { googleLogin, type GoogleLoginDto } from "../api/googleApi";
import { MultiStepFormRoutes } from "@shared/routes";
import { getErrorMessage } from "@shared/libs/error-message";
import { useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const useGoogleAuth = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { setIsAuthenticated } = useUserStore();
  const router = useRouter();
  const search = useSearch({ strict: false }) as { redirect?: string };

  const mutation = useMutation({
    mutationFn: (data: GoogleLoginDto) => googleLogin(data),
    onSuccess: async (data) => {
      addToast({
        title: t("login.successTitle"),
        description: t("login.googleSuccessDescription"),
        color: "success",
      });
      setIsAuthenticated(true);
      if (data.newUser) {
        router.navigate({ to: MultiStepFormRoutes.fillForm });
      } else {
        await router.invalidate();
        router.navigate({ to: search.redirect ?? "/activities" });
      }
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", { action: t("login.signIn") }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (tokenResponse) => {
      if (!tokenResponse.code) {
        addToast({
          title: t("login.googleAuthTitle"),
          description: t("login.googleAuthDescription"),
          color: "success",
        });
        return;
      }
      mutation.mutate({ code: tokenResponse.code });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("login.googleSignIn"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    loginWithGoogle: login,
    isLoading: mutation.isPending,
  };
};

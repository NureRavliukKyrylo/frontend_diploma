import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { addToast } from "@heroui/react";
import { useUserProfileStore } from "@entities/user";
import { profileKeys } from "@entities/user/profile";
import { queryClient } from "@shared/api";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  linkGoogleAccount,
  unlinkGoogleAccount,
} from "../api/connectedServicesApi";
import type { ConnectedServiceHooks } from "../config/ServiceHooks";
import { useTranslation } from "react-i18next";

export const useGoogleAccountService = (): ConnectedServiceHooks => {
  const { setUnlinkTarget, openVerificationModal } = useUserProfileStore();
  const { t } = useTranslation(["profile", "common"]);

  const linkMutation = useMutation({
    mutationFn: linkGoogleAccount,
    onSuccess: () => {
      addToast({
        title: t("security.google.linkSuccess"),
        description: t("security.google.linkDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("security.google.linkFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: unlinkGoogleAccount,
    onSuccess: () => {
      addToast({
        title: t("security.google.unlinkRequestSuccess"),
        description: t("security.google.unlinkRequestDescription"),
        color: "success",
      });
      setUnlinkTarget("google");
      openVerificationModal("unlink");
    },
    onError: (error: unknown) => {
      addToast({
        title: t("security.google.unlinkFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const linkTrigger = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => linkMutation.mutate(code),
    onError: (error: unknown) => {
      addToast({
        title: t("security.google.oauthFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    link: { trigger: linkTrigger, isLoading: linkMutation.isPending },
    unlink: {
      trigger: () => unlinkMutation.mutate(),
      isLoading: unlinkMutation.isPending,
    },
  };
};

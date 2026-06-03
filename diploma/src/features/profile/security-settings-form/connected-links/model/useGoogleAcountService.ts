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

export const useGoogleAccountService = (): ConnectedServiceHooks => {
  const { setUnlinkTarget, openVerificationModal } = useUserProfileStore();

  const linkMutation = useMutation({
    mutationFn: linkGoogleAccount,
    onSuccess: () => {
      addToast({
        title: "Google account connected",
        description: "Your Google-account has been connected succesfully",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Google link failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: unlinkGoogleAccount,
    onSuccess: () => {
      addToast({
        title: "Unlink request sent",
        description: "Check your email to confirm",
        color: "success",
      });
      setUnlinkTarget("google");
      openVerificationModal("unlink");
    },
    onError: (error: unknown) => {
      addToast({
        title: "Google unlink failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const linkTrigger = useGoogleLogin({
    flow: "auth-code",
    onSuccess: ({ code }) => linkMutation.mutate(code),
    onError: (error: unknown) => {
      addToast({
        title: "Google OAuth failed",
        description: getErrorMessage(error),
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

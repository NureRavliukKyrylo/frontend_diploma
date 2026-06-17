import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { addToast } from "@heroui/react";
import { profileKeys } from "@entities/user/profile";
import { queryClient } from "@shared/api";
import { getErrorMessage } from "@shared/libs/error-message";
import {
  linkGoogleCalendar,
  unlinkGoogleCalendar,
} from "../api/connectedServicesApi";
import type { ConnectedServiceHooks } from "../config/ServiceHooks";
import { useTranslation } from "react-i18next";

export const useGoogleCalendarService = (): ConnectedServiceHooks => {
  const { t } = useTranslation(["profile", "common"]);
  const linkMutation = useMutation({
    mutationFn: linkGoogleCalendar,
    onSuccess: () => {
      addToast({
        title: t("security.calendar.linkSuccess"),
        description: t("security.calendar.linkDescription"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("security.calendar.linkFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: unlinkGoogleCalendar,
    onSuccess: () => {
      addToast({
        title: t("security.calendar.unlinkSuccess"),
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("security.calendar.unlinkFailed"),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  const linkTrigger = useGoogleLogin({
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/calendar",
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

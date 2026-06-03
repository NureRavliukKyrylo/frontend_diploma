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

export const useGoogleCalendarService = (): ConnectedServiceHooks => {
  const linkMutation = useMutation({
    mutationFn: linkGoogleCalendar,
    onSuccess: () => {
      addToast({
        title: "Google Calendar connected",
        description: "Your Google-account has been connected succesfully",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Calendar connection failed",
        description: getErrorMessage(error),
        color: "danger",
      });
    },
  });

  const unlinkMutation = useMutation({
    mutationFn: unlinkGoogleCalendar,
    onSuccess: () => {
      addToast({ title: "Google Calendar disconnected", color: "success" });
      queryClient.invalidateQueries({ queryKey: profileKeys.all() });
    },
    onError: (error: unknown) => {
      addToast({
        title: "Calendar disconnect failed",
        description: getErrorMessage(error),
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

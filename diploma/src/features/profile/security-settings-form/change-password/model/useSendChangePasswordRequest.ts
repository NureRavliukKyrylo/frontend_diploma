import { useMutation } from "@tanstack/react-query";
import { sendChangePasswordRequest } from "../api/sendChangePasswordRequestApi";
import { addToast } from "@heroui/react";
import { useUserProfileStore } from "@entities/user";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

export const useSendChangePasswordRequest = () => {
  const { openVerificationModal } = useUserProfileStore();
  const { t } = useTranslation(["profile", "common"]);

  const mutation = useMutation({
    mutationFn: sendChangePasswordRequest,
    onSuccess: () => {
      addToast({
        title: t("security.changePassword.requestSuccess"),
        description: t("security.changePassword.requestDescription"),
        color: "success",
      });
      openVerificationModal("changePassword");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", {
          action: t("security.changePassword.action"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    sendPassword: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

import { useMutation } from "@tanstack/react-query";
import { disableTwoFactor } from "../api/twoFactorApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useUserProfileStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const useDisableTwoFactor = () => {
  const { openVerificationModal } = useUserProfileStore();
  const { t } = useTranslation(["profile", "common"]);

  const mutation = useMutation({
    mutationFn: disableTwoFactor,
    onSuccess: () => {
      addToast({
        title: t("security.twoFactor.disableRequestSuccess"),
        description: t("security.twoFactor.disableRequestDescription"),
        color: "success",
      });
      openVerificationModal("twoFactorDisable");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", {
          action: t("security.twoFactor.disableAction"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    disableTwoFactor: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

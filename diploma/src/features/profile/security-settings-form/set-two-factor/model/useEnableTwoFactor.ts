import { useMutation } from "@tanstack/react-query";
import { enableTwoFactor } from "../api/twoFactorApi";
import { addToast } from "@heroui/react";
import { getErrorMessage } from "@shared/libs/error-message";
import { useUserProfileStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const useEnableTwoFactor = () => {
  const { openVerificationModal } = useUserProfileStore();
  const { t } = useTranslation(["profile", "common"]);

  const mutation = useMutation({
    mutationFn: enableTwoFactor,
    onSuccess: () => {
      addToast({
        title: t("security.twoFactor.enableRequestSuccess"),
        description: t("security.twoFactor.enableRequestDescription"),
        color: "success",
      });
      openVerificationModal("twoFactorEnable");
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, t);

      addToast({
        title: t("common:errors.actionFailed", {
          action: t("security.twoFactor.enableAction"),
        }),
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    enableTwoFactor: mutation.mutate,
    isLoading: mutation.isPending,
    errorMessage: mutation.error ? getErrorMessage(mutation.error, t) : null,
  };
};

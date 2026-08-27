import { useMutation } from "@tanstack/react-query";
import {
  resendEmailVerification,
  resendTwoFactor,
  resendPasswordReset,
} from "../api/resendCodeApi";
import { addToast } from "@heroui/react";
import { OtpType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs/error-message";
import { useTranslation } from "react-i18next";

interface UseResendCodeProps {
  type: OtpType;
  userId?: string;
  email?: string;
}

export const useResendCode = ({ type, userId, email }: UseResendCodeProps) => {
  const { t } = useTranslation(["auth", "common"]);

  const resendMap: Record<OtpType, () => Promise<unknown>> = {
    [OtpType.EmailVerification]: () => resendEmailVerification(userId ?? ""),
    [OtpType.TwoFactor]: () => resendTwoFactor(),
    [OtpType.PasswordReset]: () => resendPasswordReset(email ?? ""),
  };

  const mutation = useMutation({
    mutationFn: resendMap[type],
    onSuccess: () => {
      addToast({
        title: t("verification.resend.successTitle"),
        description: t("verification.resend.successDescription"),
        color: "success",
      });
    },
    onError: (error: unknown) => {
      addToast({
        title: t("common:errors.actionFailed", {
          action: t("common:actions.resendCode"),
        }),
        description: getErrorMessage(error, t),
        color: "danger",
      });
    },
  });

  return {
    resend: () => mutation.mutateAsync(),
    isLoadingResend: mutation.isPending,
    resendErrorMessage: mutation.error
      ? getErrorMessage(mutation.error, t)
      : null,
  };
};

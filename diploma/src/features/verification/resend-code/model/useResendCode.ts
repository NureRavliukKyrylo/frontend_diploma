import { useMutation } from "@tanstack/react-query";
import {
  resendEmailVerification,
  resendTwoFactor,
  resendPasswordReset,
} from "../api/resendCodeApi";
import { addToast } from "@heroui/react";
import { OtpType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs/error-message";

interface UseResendCodeProps {
  type: OtpType;
  userId?: string;
  email?: string;
}

export const useResendCode = ({ type, userId, email }: UseResendCodeProps) => {
  const resendMap: Record<OtpType, () => Promise<unknown>> = {
    [OtpType.EmailVerification]: () => resendEmailVerification(userId ?? ""),
    [OtpType.TwoFactor]: () => resendTwoFactor(),
    [OtpType.PasswordReset]: () => resendPasswordReset(email ?? ""),
  };

  const mutation = useMutation({
    mutationFn: resendMap[type],
    onSuccess: () => {
      addToast({
        title: "Code sent",
        description: "A new verification code has been sent to your email.",
        color: "success",
      });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error);

      addToast({
        title: "Resend Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    resend: () => mutation.mutateAsync(),
    isLoadingResend: mutation.isPending,
    resendErrorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

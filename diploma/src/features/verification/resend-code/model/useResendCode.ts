import { useMutation } from "@tanstack/react-query";
import { resendCode, type ResendCodeDto } from "../api/resendCodeApi";
import { useUserStore } from "@entities/user";
import { addToast } from "@heroui/react";

import type { OtpType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs";

interface UseResendCodeProps {
  type: OtpType;
}

export const useResendCode = ({ type }: UseResendCodeProps) => {
  const { userId } = useUserStore();


  const mutation = useMutation({
    mutationFn: (data: ResendCodeDto) => resendCode(data),
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
    resend: () => mutation.mutateAsync({ userId, type }),
    isLoadingResend: mutation.isPending,
    resendErrorMessage: mutation.error ? getErrorMessage(mutation.error) : null,
  };
};

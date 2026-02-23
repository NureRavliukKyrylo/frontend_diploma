import { useMutation, useQuery } from "@tanstack/react-query";
import { resendCode } from "../api/resendCodeApi";
import { addToast } from "@heroui/react";
import type { OtpType } from "@shared/config/types";
import { getErrorMessage } from "@shared/libs";
import { profileQuery } from "@entities/user/profile";

interface UseResendCodeProps {
  type: OtpType;
  resendFn?: () => Promise<unknown>;
}

export const useResendCode = ({ type, resendFn }: UseResendCodeProps) => {
  const { data: user } = useQuery(profileQuery.all());

  const defaultResend = () => resendCode({ userId: user?.id, type });

  const mutation = useMutation({
    mutationFn: resendFn ?? defaultResend,
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

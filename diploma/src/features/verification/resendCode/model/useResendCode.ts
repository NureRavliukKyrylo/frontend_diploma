import { useMutation } from "@tanstack/react-query";
import { resendCode, type ResendCodeDto } from "../api/resendCodeApi";
import { useAuthStore } from "@entities/user";
import { addToast } from "@heroui/react";
import { useErrorStore, type OtpType } from "@shared/config";

interface UseResendCodeProps {
  type: OtpType;
}

export const useResendCode = ({ type }: UseResendCodeProps) => {
  const { userId } = useAuthStore();
  const { setServerError } = useErrorStore();

  const mutation = useMutation({
    mutationFn: (data: ResendCodeDto) => resendCode(data),
    onSuccess: (data) => {
      console.log("Code resent successfully", data);
      addToast({
        title: "Code sent",
        description: "A new verification code has been sent to your email.",
        color: "success",
      });
    },
    onError: (error: any) => {
      console.log("Error resending code", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong, please try again";
      setServerError("otpVerificationCode", errorMessage);
      addToast({
        title: "Resend Failed",
        description: errorMessage,
        color: "danger",
      });
    },
  });

  return {
    resend: () => mutation.mutate({ userId, type }),
    isLoadingResend: mutation.isPending,
    error: mutation.error,
  };
};

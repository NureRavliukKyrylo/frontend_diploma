import { useAuthStore } from "@entities/user";
import type { OtpType } from "@shared/config/types";
import { useResendCode } from "../model/useResendCode";
import { ResendButton } from "@shared/ui/buttons";

interface ResendCodeButton {
  otpType: OtpType;
  variant?: "default" | "profile";
}

export const ResendCodeButton = ({ otpType, variant }: ResendCodeButton) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();
  const { resend, isLoadingResend, resendErrorMessage } = useResendCode({
    type: otpType,
  });

  return (
    <ResendButton
      seconds={otpTimers[otpType]}
      onResend={resend}
      resetTimer={() => resetOtpTimer(otpType)}
      decrementTimer={() => decrementOtpTimer(otpType)}
      serverError={resendErrorMessage}
      isLoading={isLoadingResend}
      variant={variant}
    />
  );
};

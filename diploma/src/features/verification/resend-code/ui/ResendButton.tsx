import type { OtpType } from "@shared/config/types";
import { useResendCode } from "../model/useResendCode";
import { ResendButton } from "@shared/ui/buttons";

interface ResendCodeButton {
  otpType: OtpType;
  variant?: "default" | "profile";
  otpTimers: Record<number, number>;
  resetOtpTimer: (type: number) => void;
  decrementOtpTimer: (type: number) => void;
  resendFn?: () => Promise<unknown>;
}

export const ResendCodeButton = ({
  otpType,
  variant,
  otpTimers,
  resetOtpTimer,
  decrementOtpTimer,
  resendFn,
}: ResendCodeButton) => {
  const { resend, isLoadingResend, resendErrorMessage } = useResendCode({
    type: otpType,
    resendFn,
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

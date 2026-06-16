import type { OtpType } from "@shared/config/types";
import { useResendCode } from "../model/useResendCode";
import { ResendButton } from "@shared/ui/buttons";
import type { TFunction } from "i18next";

interface ResendCodeButton {
  otpType: OtpType;
  variant?: "default" | "profile";
  otpTimers: Record<number, number>;
  resetOtpTimer: (type: number) => void;
  decrementOtpTimer: (type: number) => void;
  userId?: string;
  email?: string;
  t: TFunction;
}

export const ResendCodeButton = ({
  otpType,
  variant,
  otpTimers,
  resetOtpTimer,
  decrementOtpTimer,
  userId,
  email,
  t,
}: ResendCodeButton) => {
  const { resend, isLoadingResend, resendErrorMessage } = useResendCode({
    type: otpType,
    userId,
    email,
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
      t={t}
    />
  );
};

import React, { useEffect } from "react";
import styles from "./InputOTP.module.scss";
import { InputOtp as BaseInputOtp } from "@heroui/input-otp";
import { useAuthStore } from "@entities/user";
import type { OtpType } from "@shared/config";

type InputOtpProps = React.ComponentProps<typeof BaseInputOtp> & {
  error?: string | boolean;
  serverError?: string | null;
  otpType: OtpType;
  onResend?: () => void;
};

export const InputOtp: React.FC<InputOtpProps> = ({
  error,
  classNames,
  otpType,
  onResend,
  serverError,
  ...props
}) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();

  const seconds = otpTimers[otpType];
  const canResend = seconds === 0;

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => decrementOtpTimer(otpType), 1000);
    return () => clearTimeout(timer);
  }, [seconds, otpType, decrementOtpTimer]);

  const handleResend = () => {
    if (!canResend) return;
    if (!serverError) resetOtpTimer(otpType);
    onResend?.();
  };

  const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className={styles.wrapperInputOTP}>
      <BaseInputOtp
        {...props}
        isInvalid={!!error}
        errorMessage={error}
        classNames={{
          base: "w-full data-[invalid=true]:[&_.segment]:border-[oklch(0.71_0.18_21.33)]",
          segmentWrapper: "w-full flex justify-between gap-2 items-center",
          segment: [
            "segment",
            "basis-0 flex-1",
            "max-w-[65px] min-w-[28px]",
            "h-[40px] xs:h-[55px] xs:w-[50px] sm:h-[55px] md:h-[60px] lg:h-[65px]",
            "flex items-center justify-center rounded-xl",
            "border border-black shadow-md font-inter font-bold text-black",
            "text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]",
            "bg-white data-[active=true]:bg-white data-[focus=true]:bg-white",
            "focus:outline-none focus:ring-0 focus:ring-offset-0",
          ].join(" "),
          errorMessage:
            "text-tiny text-red-600 w-full mt-1 font-inter text-[13px] font-bold",
          helperWrapper: "hidden",
          ...classNames,
        }}
      />
      {error && <div className="errorInput">{error}</div>}
      <div className="mt-2 text-right">
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={`${styles.resendButton} ${
            canResend ? styles.active : styles.disabled
          }`}
        >
          {canResend ? "Resend Code" : `Resend code in ${formattedTime}`}
        </button>
      </div>
    </div>
  );
};

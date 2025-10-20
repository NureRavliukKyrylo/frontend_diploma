import React, { useEffect } from "react";
import styles from "./InputOTP.module.scss";
import { InputOtp as BaseInputOtp } from "@heroui/input-otp";
import { useAuthStore } from "@entities/user";

type InputOtpProps = React.ComponentProps<typeof BaseInputOtp> & {
  error?: string | boolean;
  otpType: "email" | "forgotPassword";
  onResend?: () => void;
};

export const InputOtp: React.FC<InputOtpProps> = ({
  error,
  classNames,
  otpType,
  onResend,
  ...props
}) => {
  const {
    otpSeconds,
    currentOtpType,
    setOtpSeconds,
    setCurrentOtpType,
    resetOtpTimer,
  } = useAuthStore();

  const isActive = currentOtpType === otpType;
  const canResend = isActive && otpSeconds === 0;

  useEffect(() => {
    if (!currentOtpType) {
      setCurrentOtpType(otpType);
    }
  }, [currentOtpType, otpType, setCurrentOtpType]);

  useEffect(() => {
    if (!isActive || otpSeconds === 0) return;

    const timer = setTimeout(() => setOtpSeconds(otpSeconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpSeconds, isActive, setOtpSeconds]);

  const handleResend = () => {
    setCurrentOtpType(otpType);
    resetOtpTimer();
    onResend?.();
  };

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
          onClick={handleResend}
          disabled={!canResend && isActive}
          className={`text-sm font-medium ${
            canResend ? "text-blue-600 hover:underline" : "text-gray-400"
          }`}
        >
          {canResend
            ? "Resend Code"
            : isActive
            ? `Resend code in ${Math.floor(otpSeconds / 60)}:${(otpSeconds % 60)
                .toString()
                .padStart(2, "0")}`
            : "Send OTP"}
        </button>
      </div>
    </div>
  );
};

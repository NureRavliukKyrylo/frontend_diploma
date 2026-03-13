import React, { type ComponentProps } from "react";
import styles from "./InputOTP.module.scss";
import { InputOtp as BaseInputOtp } from "@heroui/input-otp";

type InputOtpProps = ComponentProps<typeof BaseInputOtp> & {
  error?: string;
};

export const InputOtp: React.FC<InputOtpProps> = ({
  error,
  classNames,
  ...props
}) => {
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
    </div>
  );
};

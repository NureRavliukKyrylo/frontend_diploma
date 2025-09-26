import styles from "./VerificationForm.module.scss";
import { useErrorStore } from "../../../../shared/stores";
import { AuthButton } from "../../../../shared/buttons/auth";
import { InputOtp } from "@heroui/input-otp";
import React from "react";

export const VerificationForm = () => {
  const serverError = useErrorStore((state) => state.serverError);
  const [value, setValue] = React.useState("");
  return (
    <>
      <form className={styles.verificationForm}>
        <InputOtp
          length={6}
          value={value}
          onValueChange={setValue}
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
          }}
        />

        <div className={styles.buttonBlock}>
          <AuthButton loading={false} label="Confirm" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};

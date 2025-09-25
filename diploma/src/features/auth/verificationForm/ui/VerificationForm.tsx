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
            base: "data-[invalid=true]:[&_.segment]:border-[oklch(0.71_0.18_21.33)]",
            segment: [
              "segment w-[14vw] max-w-[68px] h-[12vw] max-h-[65px] flex items-center justify-center rounded-xl",
              "border border-black shadow-md font-inter text-[5vw] max-text-[30px] font-bold text-black",
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

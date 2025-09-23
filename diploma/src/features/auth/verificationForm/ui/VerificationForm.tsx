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
        <div>
          <InputOtp
            length={6}
            value={value}
            onValueChange={setValue}
            variant="bordered"
            color="default"
            autoFocus={false}
            fullWidth={true}
            isRequired={true}
            classNames={{
              segmentWrapper: "inline-flex gap-x-2 py-2 w-full justify-between",
              segment:
                "w-[68px] h-[65px] flex items-center justify-center rounded-xl border border-black shadow-md font-inter text-[30px] font-bold text-black",
              errorMessage:
                "text-tiny text-red-600 w-full mt-1 font-inter text-[13px] font-bold",
            }}
          />
        </div>
        <div className={styles.buttonBlock}>
          <AuthButton loading={false} label="Confirm" />
          {serverError && <div className="errorMessage">{serverError}</div>}
        </div>
      </form>
    </>
  );
};

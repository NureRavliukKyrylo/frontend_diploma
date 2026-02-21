import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { twoFactorVerification } from "../api/twoFactorVerificationApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./TwoFactorVerificationForm.module.scss";
import { useAuthStore } from "@entities/user";

export const TwoFactorVerificationForm: React.FC = () => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: twoFactorVerification,
    successRedirect: "/home",
    successMessage: "Two factor verified successfully",
  });

  return (
    <VerificationForm
      otpType={OtpType.TwoFactor}
      formik={formik}
      verificationError={errorMessage}
    >
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton
          otpType={OtpType.TwoFactor}
          otpTimers={otpTimers}
          resetOtpTimer={resetOtpTimer}
          decrementOtpTimer={decrementOtpTimer}
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Confirm
        </BaseButtonWrapper>
      </div>
    </VerificationForm>
  );
};

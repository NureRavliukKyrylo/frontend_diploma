import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { AuthRoutes } from "@shared/routes";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ForgotPasswordVerificationForm.module.scss";
import { useAuthStore } from "@entities/user";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer, emailForgotPassword } =
    useAuthStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationForgotPassword,
    successRedirect: AuthRoutes.forgotPassword.setPassword,
    successMessage: "Email verified successfully",
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton
          otpType={OtpType.PasswordReset}
          otpTimers={otpTimers}
          decrementOtpTimer={decrementOtpTimer}
          resetOtpTimer={resetOtpTimer}
          email={emailForgotPassword}
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

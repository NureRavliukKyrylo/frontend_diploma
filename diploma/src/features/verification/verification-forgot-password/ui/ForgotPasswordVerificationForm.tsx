import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import {
  ResendCodeButton,
  useResendCode,
} from "@features/verification/resend-code";
import { AuthRoutes } from "@shared/routes";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ForgotPasswordVerificationForm.module.scss";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { resendErrorMessage } = useResendCode({
    type: OtpType.PasswordReset,
  });
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationForgotPassword,
    successRedirect: `../${AuthRoutes.forgotPassword.setPassword}`,
    successMessage: "Email verified successfully",
  });

  return (
    <VerificationForm
      otpType={OtpType.PasswordReset}
      formik={formik}
      verificationError={errorMessage}
      resendError={resendErrorMessage}
    >
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton otpType={OtpType.PasswordReset} />
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

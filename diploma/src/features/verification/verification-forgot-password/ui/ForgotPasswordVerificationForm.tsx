import React from "react";
import { OtpType } from "@shared/config";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import { useResendCode } from "@features/verification/resend-code";
import { AuthRoutes } from "@shared/routes";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { resend, isLoadingResend } = useResendCode({
    type: OtpType.PasswordReset,
  });
  const { formik, isLoading } = useVerification({
    apiFn: verificationForgotPassword,
    successRedirect: `../${AuthRoutes.forgotPassword.setPassword}`,
    successMessage: "Email verified successfully",
    errorMessage: "Email verification failed",
  });

  return (
    <VerificationForm
      otpType={OtpType.PasswordReset}
      formik={formik}
      isLoading={isLoading}
      onResend={resend}
      isLoadingResend={isLoadingResend}
    />
  );
};

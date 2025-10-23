import React from "react";
import { OtpType } from "@shared/config";
import { VerificationForm } from "@features/verification";
import { useVerification } from "@features/verification";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import { useResendCode } from "@features/verification";
import { AuthRoutes } from "@shared/routes";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { resend } = useResendCode({ type: OtpType.PasswordReset });
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
    />
  );
};

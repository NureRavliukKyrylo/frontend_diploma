import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import { useResendCode } from "@features/verification/resend-code";
import { AuthRoutes } from "@shared/routes";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { resend, isLoadingResend, resendErrorMessage } = useResendCode({
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
      isLoading={isLoading}
      onResend={resend}
      isLoadingResend={isLoadingResend}
      verificationError={errorMessage}
      resendError={resendErrorMessage}
    />
  );
};

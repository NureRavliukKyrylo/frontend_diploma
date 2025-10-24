import React from "react";
import { OtpType } from "@shared/config";
import { VerificationForm } from "@features/verification";
import { useVerification } from "@features/verification";
import { verificationEmail } from "../api/verificationEmailApi";
import { useResendCode } from "@features/verification";
import { MultiStepFormRoutes } from "@shared/routes";

export const EmailVerificationForm: React.FC = () => {
  const { resend, isLoadingResend } = useResendCode({
    type: OtpType.EmailVerification,
  });
  const { formik, isLoading } = useVerification({
    apiFn: verificationEmail,
    successRedirect: MultiStepFormRoutes.fillForm,
    successMessage: "Email verified successfully",
    errorMessage: "Email verification failed",
  });

  return (
    <VerificationForm
      otpType={OtpType.EmailVerification}
      formik={formik}
      isLoading={isLoading}
      isLoadingResend={isLoadingResend}
      onResend={resend}
    />
  );
};

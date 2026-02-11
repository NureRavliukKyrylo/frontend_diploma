import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationEmail } from "../api/verificationEmailApi";
import { useResendCode } from "@features/verification/resend-code";
import { MultiStepFormRoutes } from "@shared/routes";

export const EmailVerificationForm: React.FC = () => {
  const { resend, isLoadingResend } = useResendCode({
    type: OtpType.EmailVerification,
  });
  const { formik, isLoading } = useVerification({
    apiFn: verificationEmail,
    successRedirect: MultiStepFormRoutes.fillForm,
    successMessage: "Email verified successfully",
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

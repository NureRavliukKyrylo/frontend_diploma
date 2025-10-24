import React from "react";
import { OtpType } from "@shared/config";
import { VerificationForm } from "@features/verification";
import { useVerification } from "@features/verification";
import { twoFactorVerification } from "../api/twoFactorVerificationApi";
import { useResendCode } from "@features/verification";

export const TwoFactorVerificationForm: React.FC = () => {
  const { resend, isLoadingResend } = useResendCode({
    type: OtpType.TwoFactor,
  });
  const { formik, isLoading } = useVerification({
    apiFn: twoFactorVerification,
    successRedirect: "/home",
    successMessage: "Two factor verified successfully",
    errorMessage: "Two factor verification failed",
  });

  return (
    <VerificationForm
      otpType={OtpType.TwoFactor}
      formik={formik}
      isLoading={isLoading}
      onResend={resend}
      isLoadingResend={isLoadingResend}
    />
  );
};

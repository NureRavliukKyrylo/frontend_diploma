import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { twoFactorVerification } from "../api/twoFactorVerificationApi";
import { useResendCode } from "@features/verification/resend-code";

export const TwoFactorVerificationForm: React.FC = () => {
  const { resend, isLoadingResend, resendErrorMessage } = useResendCode({
    type: OtpType.TwoFactor,
  });
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: twoFactorVerification,
    successRedirect: "/home",
    successMessage: "Two factor verified successfully",
  });

  return (
    <VerificationForm
      otpType={OtpType.TwoFactor}
      formik={formik}
      isLoading={isLoading}
      onResend={resend}
      isLoadingResend={isLoadingResend}
      verificationError={errorMessage}
      resendError={resendErrorMessage}
    />
  );
};

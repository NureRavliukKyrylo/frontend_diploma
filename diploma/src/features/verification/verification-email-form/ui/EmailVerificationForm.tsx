import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationEmail } from "../api/verificationEmailApi";
import { useResendCode } from "@features/verification/resend-code";
import { MultiStepFormRoutes } from "@shared/routes";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./EmailVerificationForm.module.scss";

export const EmailVerificationForm: React.FC = () => {
  const { resendErrorMessage } = useResendCode({
    type: OtpType.EmailVerification,
  });
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationEmail,
    successRedirect: MultiStepFormRoutes.fillForm,
    successMessage: "Email verified successfully",
  });

  return (
    <VerificationForm
      otpType={OtpType.EmailVerification}
      formik={formik}
      verificationError={errorMessage}
      resendError={resendErrorMessage}
    >
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton otpType={OtpType.EmailVerification} />
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

import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationChangePassword } from "../api/verificationChangePassword";
import {
  ResendCodeButton,
  useResendCode,
} from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangePasswordVerificationForm.module.scss";

interface ChangePasswordVerificationFormProps {
  onSuccess?: () => void;
}
export const ChangePasswordVerificationForm: React.FC<
  ChangePasswordVerificationFormProps
> = ({ onSuccess }) => {
  const { resendErrorMessage } = useResendCode({
    type: OtpType.TwoFactor,
  });
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationChangePassword,
    successRedirect: "/home",
    successMessage: "Two factor verified successfully",
    onSuccess,
  });

  return (
    <VerificationForm
      otpType={OtpType.PasswordReset}
      formik={formik}
      verificationError={errorMessage}
      resendError={resendErrorMessage}
    >
      <div className={styles.actionVerificationTwoFactorBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Send Code
        </BaseButtonWrapper>
        <ResendCodeButton otpType={OtpType.TwoFactor} variant="profile" />
      </div>
    </VerificationForm>
  );
};

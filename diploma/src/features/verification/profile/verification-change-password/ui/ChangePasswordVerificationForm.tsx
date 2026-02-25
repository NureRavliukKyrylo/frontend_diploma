import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationChangePassword } from "../api/verificationChangePassword";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangePasswordVerificationForm.module.scss";
import { useUserProfileStore, useUserStore } from "@entities/user";

interface ChangePasswordVerificationFormProps {
  onSuccess?: () => void;
}

export const ChangePasswordVerificationForm: React.FC<
  ChangePasswordVerificationFormProps
> = ({ onSuccess }) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useUserProfileStore();
  const { isPasswordSet } = useUserStore();
  const successMessage = isPasswordSet
    ? "Change Password code"
    : "Set new password code";
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationChangePassword,
    successMessage: `${successMessage} verified successfully`,
    onSuccess,
  });

  return (
    <VerificationForm
      otpType={OtpType.PasswordChange}
      formik={formik}
      verificationError={errorMessage}
    >
      <div className={styles.actionVerificationChangePasswordBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Send Code
        </BaseButtonWrapper>
        <ResendCodeButton
          otpType={OtpType.PasswordChange}
          variant="profile"
          otpTimers={otpTimers}
          decrementOtpTimer={decrementOtpTimer}
          resetOtpTimer={resetOtpTimer}
        />
      </div>
    </VerificationForm>
  );
};

import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import {
  verificationChangeEmail,
  type CodeType,
  type VerificationChangeEmailDto,
} from "../api/verificationChangeEmail";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangeEmailVerification.module.scss";
import { useUserProfileStore } from "@entities/user";

interface ChangeEmailVerificationProps {
  code?: CodeType;
  otpType: OtpType;
  onSuccess?: () => void;
}

export const ChangeEmailVerification: React.FC<
  ChangeEmailVerificationProps
> = ({ code, otpType, onSuccess }) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer, newEmail } =
    useUserProfileStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationChangeEmailDto) =>
      verificationChangeEmail(data, code ?? "old-code"),
    successMessage: "Email verified successfully",
    onSuccess,
    extraFields: code === "new-code" ? { newEmail } : {},
  });

  return (
    <VerificationForm
      otpType={otpType}
      formik={formik}
      verificationError={errorMessage}
    >
      <div className={styles.actionVerificationChangeEmailBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Send Code
        </BaseButtonWrapper>
        <ResendCodeButton
          otpType={otpType}
          otpTimers={otpTimers}
          decrementOtpTimer={decrementOtpTimer}
          resetOtpTimer={resetOtpTimer}
          variant="profile"
        />
      </div>
    </VerificationForm>
  );
};

import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import {
  twoFactorVerificationProfile,
  type VerificationProfileDto,
  type VerificationType,
} from "../api/twoFactorVerificationApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./TwoFactorVerificationFormEnable.module.scss";
import { useUserProfileStore } from "@entities/user";

interface TwoFactorVerificationProfileFormProps {
  otpType: OtpType;
  verificationType: VerificationType;
  onSuccess?: () => void;
}
export const TwoFactorVerificationProfileForm: React.FC<
  TwoFactorVerificationProfileFormProps
> = ({ onSuccess, otpType, verificationType }) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useUserProfileStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationProfileDto) =>
      twoFactorVerificationProfile(data, verificationType),
    successRedirect: "/home",
    successMessage: `Two factor ${verificationType} verified successfully`,
    onSuccess,
  });

  return (
    <VerificationForm
      otpType={otpType}
      formik={formik}
      verificationError={errorMessage}
    >
      <div className={styles.actionVerificationTwoFactorBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Send Code
        </BaseButtonWrapper>
        <ResendCodeButton
          otpType={otpType}
          otpTimers={otpTimers}
          resetOtpTimer={resetOtpTimer}
          decrementOtpTimer={decrementOtpTimer}
          variant="profile"
        />
      </div>
    </VerificationForm>
  );
};

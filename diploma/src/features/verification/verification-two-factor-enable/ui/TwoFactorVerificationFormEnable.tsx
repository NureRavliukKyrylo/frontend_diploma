import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { twoFactorVerificationEnable } from "../api/twoFactorVerificationEnableApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./TwoFactorVerificationFormEnable.module.scss";
import { useUserProfileStore } from "@entities/user";

interface TwoFactorVerificationFormEnableProps {
  onSuccess?: () => void;
}
export const TwoFactorVerificationFormEnable: React.FC<
  TwoFactorVerificationFormEnableProps
> = ({ onSuccess }) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useUserProfileStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: twoFactorVerificationEnable,
    successRedirect: "/home",
    successMessage: "Two factor verified successfully",
    onSuccess,
  });

  return (
    <VerificationForm
      otpType={OtpType.TwoFactor}
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
          otpType={OtpType.TwoFactor}
          otpTimers={otpTimers}
          resetOtpTimer={resetOtpTimer}
          decrementOtpTimer={decrementOtpTimer}
          variant="profile"
        />
      </div>
    </VerificationForm>
  );
};

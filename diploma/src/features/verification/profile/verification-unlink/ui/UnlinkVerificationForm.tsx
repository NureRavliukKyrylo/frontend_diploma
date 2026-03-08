import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./UnlinkVerificationForm.module.scss";
import { useUserProfileStore } from "@entities/user";
import type { ConnectedLinkPlatform } from "@entities/user/profile";
import {
  verificationUnlink,
  type UnlinkDto,
} from "../api/verificationUnlinkApi";

interface UnlinkVerificationFormProps {
  otpType: OtpType;
  verificationLink: ConnectedLinkPlatform;
  platform: string;
  onSuccess?: () => void;
}

export const UnlinkVerificationForm: React.FC<UnlinkVerificationFormProps> = ({
  onSuccess,
  otpType,
  platform,
  verificationLink,
}) => {
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useUserProfileStore();

  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: UnlinkDto) => verificationUnlink(data, verificationLink),
    successMessage: `Unlink ${platform} verified successfully`,
    onSuccess,
  });

  return (
    <VerificationForm
      otpType={otpType}
      formik={formik}
      verificationError={errorMessage}
    >
      <div className={styles.actionVerificationUnlinkBlock}>
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

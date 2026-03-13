import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import {
  confirmTwoFactorVerification,
  twoFactorVerificationProfile,
  type VerificationProfileDto,
  type VerificationType,
} from "../api/twoFactorVerificationApi";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./TwoFactorVerificationForm.module.scss";

interface TwoFactorVerificationProfileFormProps {
  verificationType: VerificationType;
  onSuccess?: () => void;
}
export const TwoFactorVerificationProfileForm: React.FC<
  TwoFactorVerificationProfileFormProps
> = ({ onSuccess, verificationType }) => {
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationProfileDto) =>
      twoFactorVerificationProfile(data, verificationType),
    confirmFn: () => confirmTwoFactorVerification(verificationType),
    successMessage: `Two factor ${verificationType} verified successfully`,
    onSuccess,
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationTwoFactorBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          Send Code
        </BaseButtonWrapper>
      </div>
    </VerificationForm>
  );
};

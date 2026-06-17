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
import { useTranslation } from "react-i18next";

interface TwoFactorVerificationProfileFormProps {
  verificationType: VerificationType;
  onSuccess?: () => void;
}
export const TwoFactorVerificationProfileForm: React.FC<
  TwoFactorVerificationProfileFormProps
> = ({ onSuccess, verificationType }) => {
  const { t } = useTranslation("profile");
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationProfileDto) =>
      twoFactorVerificationProfile(data, verificationType),
    confirmFn: () => confirmTwoFactorVerification(verificationType),
    successMessage:
      verificationType === "enable"
        ? t("security.twoFactor.enableVerifySuccess")
        : t("security.twoFactor.disableVerifySuccess"),
    onSuccess,
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationTwoFactorBlock}>
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          {t("settings.actions.sendCode")}
        </BaseButtonWrapper>
      </div>
    </VerificationForm>
  );
};

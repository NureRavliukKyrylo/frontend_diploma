import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationChangePassword } from "../api/verificationChangePassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangePasswordVerificationForm.module.scss";
import { useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

interface ChangePasswordVerificationFormProps {
  onSuccess?: () => void;
}

export const ChangePasswordVerificationForm: React.FC<
  ChangePasswordVerificationFormProps
> = ({ onSuccess }) => {
  const { t } = useTranslation("profile");
  const { isPasswordSet } = useUserStore();

  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationChangePassword,
    successMessage: isPasswordSet
      ? t("security.changePassword.codeVerifySuccess")
      : t("security.changePassword.codeSetSuccess"),
    onSuccess,
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationChangePasswordBlock}>
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

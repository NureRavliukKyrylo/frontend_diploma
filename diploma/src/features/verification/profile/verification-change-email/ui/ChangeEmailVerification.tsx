import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import {
  verificationChangeEmail,
  type CodeType,
  type VerificationChangeEmailDto,
} from "../api/verificationChangeEmail";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangeEmailVerification.module.scss";
import { useUserProfileStore } from "@entities/user";
import { useTranslation } from "react-i18next";

interface ChangeEmailVerificationProps {
  code?: CodeType;
  onSuccess?: () => void;
}

export const ChangeEmailVerification: React.FC<
  ChangeEmailVerificationProps
> = ({ code, onSuccess }) => {
  const { newEmail } = useUserProfileStore();
  const { t } = useTranslation("profile");
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationChangeEmailDto) =>
      verificationChangeEmail(data, code ?? "old-code"),
    successMessage: t("security.changeEmail.verifySuccess"),
    onSuccess,
    extraFields: code === "new-code" ? { newEmail } : {},
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationChangeEmailBlock}>
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

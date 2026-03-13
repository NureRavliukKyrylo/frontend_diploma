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

interface ChangeEmailVerificationProps {
  code?: CodeType;
  onSuccess?: () => void;
}

export const ChangeEmailVerification: React.FC<
  ChangeEmailVerificationProps
> = ({ code, onSuccess }) => {
  const { newEmail } = useUserProfileStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: VerificationChangeEmailDto) =>
      verificationChangeEmail(data, code ?? "old-code"),
    successMessage: "Email verified successfully",
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
          Send Code
        </BaseButtonWrapper>
      </div>
    </VerificationForm>
  );
};

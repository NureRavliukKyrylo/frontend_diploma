import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationChangePassword } from "../api/verificationChangePassword";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ChangePasswordVerificationForm.module.scss";
import { useUserStore } from "@entities/user";

interface ChangePasswordVerificationFormProps {
  onSuccess?: () => void;
}

export const ChangePasswordVerificationForm: React.FC<
  ChangePasswordVerificationFormProps
> = ({ onSuccess }) => {
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
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationChangePasswordBlock}>
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

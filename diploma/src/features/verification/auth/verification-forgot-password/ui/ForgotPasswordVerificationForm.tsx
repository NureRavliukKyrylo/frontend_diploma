import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationForgotPassword } from "../api/verificationForgotPasswordApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { AuthRoutes } from "@shared/routes";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./ForgotPasswordVerificationForm.module.scss";
import { useAuthStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const ForgotPasswordVerificationForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { otpTimers, resetOtpTimer, decrementOtpTimer, emailForgotPassword } =
    useAuthStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationForgotPassword,
    successRedirect: AuthRoutes.forgotPassword.setPassword,
    successMessage: t("verification.successMessage"),
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton
          otpType={OtpType.PasswordReset}
          otpTimers={otpTimers}
          decrementOtpTimer={decrementOtpTimer}
          resetOtpTimer={resetOtpTimer}
          email={emailForgotPassword}
          t={t}
        />
        <BaseButtonWrapper
          loading={isLoading}
          className={styles.confirmVerificationButton}
        >
          {t("verification.confirm")}
        </BaseButtonWrapper>
      </div>
    </VerificationForm>
  );
};

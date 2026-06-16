import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { verificationEmail } from "../api/verificationEmailApi";
import { MultiStepFormRoutes } from "@shared/routes";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./EmailVerificationForm.module.scss";
import { useAuthStore, useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export const EmailVerificationForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();
  const { userId } = useUserStore();
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: verificationEmail,
    successRedirect: MultiStepFormRoutes.fillForm,
    successMessage: t("verification.email.successMessage"),
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton
          otpType={OtpType.EmailVerification}
          otpTimers={otpTimers}
          decrementOtpTimer={decrementOtpTimer}
          resetOtpTimer={resetOtpTimer}
          userId={userId}
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

import React from "react";
import { OtpType } from "@shared/config/types";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { twoFactorVerification } from "../api/twoFactorVerificationApi";
import { ResendCodeButton } from "@features/verification/resend-code";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./TwoFactorVerificationForm.module.scss";
import { useAuthStore, useUserStore } from "@entities/user";
import { useRouter, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const TwoFactorVerificationForm: React.FC = () => {
  const { t } = useTranslation(["auth", "common"]);
  const { otpTimers, resetOtpTimer, decrementOtpTimer } = useAuthStore();
  const { setIsAuthenticated } = useUserStore();
  const search = useSearch({ strict: false }) as { redirect?: string };
  const router = useRouter();

  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: twoFactorVerification,
    successMessage: t("verification.twoFactor.successMessage"),
    onSuccess: async () => {
      setIsAuthenticated(true);
      await router.invalidate();
      router.navigate({ to: search.redirect ?? "/" });
    },
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationBlock}>
        <ResendCodeButton
          otpType={OtpType.TwoFactor}
          otpTimers={otpTimers}
          resetOtpTimer={resetOtpTimer}
          decrementOtpTimer={decrementOtpTimer}
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

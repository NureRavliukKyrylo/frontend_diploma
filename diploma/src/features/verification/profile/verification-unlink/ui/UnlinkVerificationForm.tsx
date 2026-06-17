import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./UnlinkVerificationForm.module.scss";
import type { ConnectedServiceId } from "@entities/user/profile";
import {
  verificationUnlink,
  type UnlinkDto,
} from "../api/verificationUnlinkApi";
import { useTranslation } from "react-i18next";

interface UnlinkVerificationFormProps {
  verificationLink: ConnectedServiceId;
  platform: string;
  onSuccess?: () => void;
}

export const UnlinkVerificationForm: React.FC<UnlinkVerificationFormProps> = ({
  onSuccess,
  platform,
  verificationLink,
}) => {
  const { t } = useTranslation("profile");

  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: UnlinkDto) => verificationUnlink(data, verificationLink),
    successMessage: t("security.unlink.verifySuccess", { platform }),
    onSuccess,
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationUnlinkBlock}>
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

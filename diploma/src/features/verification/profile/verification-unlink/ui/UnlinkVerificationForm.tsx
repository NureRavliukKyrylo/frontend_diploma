import React from "react";
import {
  VerificationForm,
  useVerification,
} from "@features/verification/verification-base-form";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import styles from "./UnlinkVerificationForm.module.scss";
import type { ConnectedService } from "@entities/user/profile";
import {
  verificationUnlink,
  type UnlinkDto,
} from "../api/verificationUnlinkApi";

interface UnlinkVerificationFormProps {
  verificationLink: ConnectedService;
  platform: string;
  onSuccess?: () => void;
}

export const UnlinkVerificationForm: React.FC<UnlinkVerificationFormProps> = ({
  onSuccess,
  platform,
  verificationLink,
}) => {
  const { formik, isLoading, errorMessage } = useVerification({
    apiFn: (data: UnlinkDto) => verificationUnlink(data, verificationLink),
    successMessage: `Unlink ${platform} verified successfully`,
    onSuccess,
  });

  return (
    <VerificationForm formik={formik} verificationError={errorMessage}>
      <div className={styles.actionVerificationUnlinkBlock}>
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

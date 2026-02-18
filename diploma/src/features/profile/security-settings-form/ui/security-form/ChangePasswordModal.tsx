import { BaseModal } from "@shared/ui/modals";
import styles from "../../PasswordProfileForm.module.scss";
import { VerificationWrapper } from "@shared/ui/wrappers";
import { ChangePasswordVerificationForm } from "@features/verification";

interface ChangePasswordVerificationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({
  isOpen,
  onClose,
}: ChangePasswordVerificationFormProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      showClosed={false}
      maxWidth="700px"
    >
      <VerificationWrapper
        title="Reset Password"
        description="Reset your password quickly and securely
to regain access"
      >
        <div className={styles.verificationTwoFactorBlock}>
          <ChangePasswordVerificationForm />
        </div>
      </VerificationWrapper>
    </BaseModal>
  );
};

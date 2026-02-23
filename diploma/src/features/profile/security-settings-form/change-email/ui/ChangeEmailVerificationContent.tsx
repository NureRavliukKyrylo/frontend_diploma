import { ChangeEmailVerification, type CodeType } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { useUserProfileStore } from "@entities/user";
import { OtpType } from "@shared/config/types";
import { useLogout } from "@features/auth";

export const ChangeEmailVerificationContent = () => {
  const { nextVerificationStep, verificationSteps, closeVerificationModal } =
    useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);

  const currentStep = verificationSteps["emailVerification"];
  const code: CodeType = currentStep === 1 ? "old-code" : "new-code";

  const onSuccess = async () => {
    if (code === "new-code") {
      await handleLogout();
      closeVerificationModal("emailVerification");
    } else {
      nextVerificationStep("emailVerification");
    }
  };

  return (
    <VerificationWrapper
      title="Change email"
      description={
        code === "old-code"
          ? "Verify your current email to continue"
          : "Verify your new email to complete the change"
      }
    >
      <div className={styles.verificationBlock}>
        <ChangeEmailVerification
          code={code}
          otpType={OtpType.EmailVerification}
          onSuccess={onSuccess}
        />
      </div>
    </VerificationWrapper>
  );
};

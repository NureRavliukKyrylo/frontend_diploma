import { ChangeEmailVerification, type CodeType } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "../../base-security-form/ui/SecuritySettingsForm.module.scss";
import { useUserProfileStore } from "@entities/user";
import { OtpType } from "@shared/config/types";
import { useLogout } from "@features/auth";
import { useRouter } from "@tanstack/react-router";
import { AuthRoutes } from "@shared/routes";

export const ChangeEmailVerificationContent = () => {
  const { nextVerificationStep, verificationSteps } = useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);

  const router = useRouter();

  const currentStep = verificationSteps["emailVerification"];
  const code: CodeType = currentStep === 1 ? "old-code" : "new-code";

  const onSuccess = async () => {
    if (code === "new-code") {
      try {
        await handleLogout();
      } catch {
        router.navigate({ to: AuthRoutes.root });
      }
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

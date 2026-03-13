import { ChangeEmailVerification, type CodeType } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangeEmail.module.scss";
import { useUserProfileStore } from "@entities/user";
import { useLogout } from "@features/auth";

export const ChangeEmailVerificationContent = () => {
  const { nextVerificationStep, verificationSteps, closeVerificationModal } =
    useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);

  const currentStep = verificationSteps["emailVerification"];

  const code: Record<string, CodeType> = {
    oldCode: "old-code",
    newCode: "new-code",
  };

  const dataCode = code[currentStep];

  const onSuccess = async () => {
    if (dataCode === "new-code") {
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
        dataCode === "old-code"
          ? "Verify your current email to continue"
          : "Verify your new email to complete the change"
      }
    >
      <div className={styles.verificationBlock}>
        <ChangeEmailVerification code={dataCode} onSuccess={onSuccess} />
      </div>
    </VerificationWrapper>
  );
};

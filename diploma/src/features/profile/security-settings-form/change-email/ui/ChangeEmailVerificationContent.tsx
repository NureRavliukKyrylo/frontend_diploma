import { ChangeEmailVerification, type CodeType } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangeEmail.module.scss";
import { useUserProfileStore } from "@entities/user";
import { OtpType } from "@shared/config/types";
import { useLogout } from "@features/auth";

interface CodeData {
  code: CodeType;
  otpType: OtpType;
}

export const ChangeEmailVerificationContent = () => {
  const { nextVerificationStep, verificationSteps, closeVerificationModal } =
    useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);

  const currentStep = verificationSteps["emailVerification"];

  const dataCodeMap: Record<number, CodeData> = {
    1: { code: "old-code", otpType: OtpType.ChangeEmailOld },
    2: { code: "new-code", otpType: OtpType.ChangeEmailNew },
  };

  const dataCode = dataCodeMap[currentStep];

  const onSuccess = async () => {
    if (dataCode.code === "new-code") {
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
        dataCode.code === "old-code"
          ? "Verify your current email to continue"
          : "Verify your new email to complete the change"
      }
    >
      <div className={styles.verificationBlock}>
        <ChangeEmailVerification
          code={dataCode.code}
          otpType={dataCode.otpType}
          onSuccess={onSuccess}
        />
      </div>
    </VerificationWrapper>
  );
};

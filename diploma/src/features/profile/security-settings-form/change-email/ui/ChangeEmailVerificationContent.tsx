import { ChangeEmailVerification, type CodeType } from "@features/verification";
import { VerificationWrapper } from "@shared/ui/wrappers";
import styles from "./ChangeEmail.module.scss";
import { useUserProfileStore } from "@entities/user";
import { useLogout } from "@features/auth";
import { useTranslation } from "react-i18next";

export const ChangeEmailVerificationContent = () => {
  const { t } = useTranslation("profile");
  const { nextVerificationStep, verificationSteps, closeVerificationModal } =
    useUserProfileStore();
  const { handleLogout } = useLogout(undefined, false);
  const currentStep = verificationSteps["emailVerification"];
  console.log(currentStep);
  const code: Record<number, CodeType> = {
    1: "old-code",
    3: "new-code",
  };
  const dataCode = code[currentStep];
  console.log(dataCode);
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
      title={t("security.changeEmail.title")}
      description={
        dataCode === "old-code"
          ? t("security.changeEmail.verifyOld")
          : t("security.changeEmail.verifyNew")
      }
    >
      <div className={styles.verificationBlock}>
        <ChangeEmailVerification code={dataCode} onSuccess={onSuccess} />
      </div>
    </VerificationWrapper>
  );
};

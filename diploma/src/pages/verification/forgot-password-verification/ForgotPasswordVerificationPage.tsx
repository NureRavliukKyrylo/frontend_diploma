import { useAuthStore } from "@entities/user";
import { ForgotPasswordVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

export function ForgotPasswordVerificationPage() {
  const { t } = useTranslation("auth");
  const { emailForgotPassword } = useAuthStore();

  return (
    <AdditionalWrapper
      title={t("verification.forgotPassword.title")}
      description={t("verification.forgotPassword.description", {
        email: emailForgotPassword,
      })}
    >
      <ForgotPasswordVerificationForm />
    </AdditionalWrapper>
  );
}

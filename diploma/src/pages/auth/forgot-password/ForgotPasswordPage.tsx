import { useTranslation } from "react-i18next";
import { ForgotPasswordForm } from "@features/auth";
import { AdditionalWrapper } from "@shared/ui/wrappers";

export function ForgotPasswordPage() {
  const { t } = useTranslation("auth");

  return (
    <AdditionalWrapper
      eyebrow={t("forgotPassword.eyebrow")}
      title={t("forgotPassword.pageTitle")}
      description={t("forgotPassword.pageDescription")}
    >
      <ForgotPasswordForm />
    </AdditionalWrapper>
  );
}

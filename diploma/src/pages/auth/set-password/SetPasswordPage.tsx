import { PasswordForm } from "@features/auth";
import { AdditionalWrapper } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

export function SetPasswordPage() {
  const { t } = useTranslation("auth");

  return (
    <AdditionalWrapper
      title={t("setPassword.pageTitle")}
      description={t("setPassword.pageDescription")}
    >
      <PasswordForm />
    </AdditionalWrapper>
  );
}

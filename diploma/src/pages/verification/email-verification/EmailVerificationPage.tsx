import { EmailVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

export function EmailVerificationPage() {
  const { t } = useTranslation("auth");

  return (
    <AdditionalWrapper
      title={t("verification.email.title")}
      description={t("verification.email.description")}
    >
      <EmailVerificationForm />
    </AdditionalWrapper>
  );
}

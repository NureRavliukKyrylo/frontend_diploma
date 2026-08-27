import { TwoFactorVerificationForm } from "@features/verification";
import { AdditionalWrapper } from "@shared/ui/wrappers";
import { useTranslation } from "react-i18next";

export function TwoFactorVerificationPage() {
  const { t } = useTranslation("auth");

  return (
    <AdditionalWrapper
      eyebrow={t("verification.twoFactor.eyebrow")}
      title={t("verification.twoFactor.title")}
      description={t("verification.twoFactor.description")}
    >
      <TwoFactorVerificationForm />
    </AdditionalWrapper>
  );
}

import { OrganizationCreateBrandingUploadField } from "@features/organization/create-form";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import { useTranslation } from "react-i18next";
import commonStyles from "../Common.module.scss";

interface OrganizationCreateBrandingStepProps {
  onSkip: () => void;
  onContinue: () => void;
}

export const OrganizationCreateBrandingStep = ({
  onSkip,
  onContinue,
}: OrganizationCreateBrandingStepProps) => {
  const { t } = useTranslation("organizations");
  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          {t("create.branding.title")}
        </h2>
        <p className={commonStyles.cardDesc}>
          {t("create.branding.text")}
        </p>

        <OrganizationCreateBrandingUploadField
          errorTextClassName={commonStyles.errorText}
        />
      </div>

      <div className={commonStyles.continueWrap}>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.skipButton}
          onClick={onSkip}
        >
          {t("create.actions.skip")}
        </BaseButtonWrapper>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.continueButton}
          onClick={onContinue}
        >
          {t("create.actions.continue")}
        </BaseButtonWrapper>
      </div>
    </div>
  );
};

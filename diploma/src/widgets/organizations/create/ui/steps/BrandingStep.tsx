import { OrganizationCreateBrandingUploadField } from "@features/organization/create-form";
import { BaseButtonWrapper } from "@shared/ui/buttons";
import commonStyles from "../Common.module.scss";

interface OrganizationCreateBrandingStepProps {
  onSkip: () => void;
  onContinue: () => void;
}

export const OrganizationCreateBrandingStep = ({
  onSkip,
  onContinue,
}: OrganizationCreateBrandingStepProps) => {
  return (
    <div className={commonStyles.formShell}>
      <div className={commonStyles.card}>
        <div className={commonStyles.cardDeco} />
        <h2 className={commonStyles.cardHeading}>
          Upload your organization logo
        </h2>
        <p className={commonStyles.cardDesc}>
          A clear, recognizable logo helps your organization stand out in the
          catalog and on the map. You can always change it later.
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
          Skip for now
        </BaseButtonWrapper>
        <BaseButtonWrapper
          type="button"
          className={commonStyles.continueButton}
          onClick={onContinue}
        >
          Continue
        </BaseButtonWrapper>
      </div>
    </div>
  );
};

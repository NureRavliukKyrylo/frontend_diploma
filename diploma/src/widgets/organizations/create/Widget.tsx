import { BaseButtonWrapper } from "@shared/ui/buttons";
import { IconArrowLeft } from "@tabler/icons-react";
import { useOrganizationCreateFlow } from "@features/organization/create-form";
import { OrganizationCreateStepper } from "./ui/Stepper";
import { OrganizationCreateAccessStep } from "./ui/steps/AccessStep";
import { OrganizationCreateBasicInfoStep } from "./ui/steps/BasicInfoStep";
import { OrganizationCreateBrandingStep } from "./ui/steps/BrandingStep";
import { OrganizationCreateGetStartedStep } from "./ui/steps/GetStartedStep";
import commonStyles from "./ui/Common.module.scss";
import styles from "./Widget.module.scss";

export const OrganizationCreateFlowWidget = () => {
  const {
    currentStep,
    access,
    createdOrganization,
    isSubmitting,
    handlePreviousStep,
    handleBrandingSkip,
    handleBrandingContinue,
    handleAccessChange,
    handleAccessSkip,
    handleAccessContinue,
    handleFlowComplete,
  } = useOrganizationCreateFlow();

  return (
    <section className={styles.section}>
      <BaseButtonWrapper
        type="button"
        className={styles.backButton}
        onClick={handlePreviousStep}
        aria-label="Go back"
      >
        <IconArrowLeft size={20} aria-hidden="true" />
      </BaseButtonWrapper>

      <OrganizationCreateStepper currentStep={currentStep} />

      {currentStep === 1 ? (
        <OrganizationCreateBasicInfoStep />
      ) : currentStep === 2 ? (
        <OrganizationCreateBrandingStep
          onSkip={handleBrandingSkip}
          onContinue={handleBrandingContinue}
        />
      ) : currentStep === 3 ? (
        <OrganizationCreateAccessStep
          access={access}
          onChange={handleAccessChange}
          onSkip={handleAccessSkip}
          onContinue={handleAccessContinue}
          isSubmitting={isSubmitting}
        />
      ) : createdOrganization ? (
        <OrganizationCreateGetStartedStep
          organization={createdOrganization}
          onComplete={handleFlowComplete}
        />
      ) : null}

      {currentStep > 1 && currentStep < 4 ? (
        <BaseButtonWrapper
          type="button"
          className={commonStyles.backLink}
          onClick={handlePreviousStep}
        >
          <IconArrowLeft size={16} aria-hidden="true" />
          Back
        </BaseButtonWrapper>
      ) : null}
    </section>
  );
};

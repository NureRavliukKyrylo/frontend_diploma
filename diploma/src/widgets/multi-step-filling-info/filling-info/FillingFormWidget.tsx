import { FillingInfoWrapper } from "@shared/ui/wrappers";
import { getSteps } from "./configs/stepContentConfig";
import { useAuthStore, useUserStore } from "@entities/user";
import { useTranslation } from "react-i18next";

export function FillingFormWidget() {
  const { activeStep, prevStep, skipStep, isStepCompleted, isLoading } =
    useAuthStore();
  const { firstName, lastName } = useUserStore();
  const { t } = useTranslation("auth");
  const steps = getSteps(t);
  return (
    <FillingInfoWrapper
      message={steps[activeStep].message}
      formDescription={steps[activeStep].formDescription}
      formTitle={steps[activeStep].formTitle}
      formId={steps[activeStep].formId}
      activeStep={activeStep}
      hideSkipButton={isStepCompleted(activeStep)}
      totalSteps={steps.length}
      prevStep={prevStep}
      skipStep={skipStep}
      firstName={firstName}
      lastName={lastName}
      isLoading={isLoading}
    >
      {steps[activeStep].content}
    </FillingInfoWrapper>
  );
}

import { FillingInfoWrapper } from "@shared/ui/wrappers";
import { steps } from "./configs/stepContentConfig";
import { useAuthStore, useUserStore } from "@entities/user";

export function FillingFormWidget() {
  const { activeStep, prevStep, skipStep, isStepCompleted, isLoading } =
    useAuthStore();
  const { firstName, lastName } = useUserStore();
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

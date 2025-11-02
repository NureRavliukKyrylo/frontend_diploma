import { FillingInfoWrapper } from "@shared/ui/wrappers";
import { steps } from "./configs/stepContentConfig";
import { useAuthStore } from "@entities/user";

export function FillingFormWidget() {
  const { activeStep, isStepCompleted } = useAuthStore();
  return (
    <FillingInfoWrapper
      message={steps[activeStep].message}
      formDescription={steps[activeStep].formDescription}
      formTitle={steps[activeStep].formTitle}
      formId={steps[activeStep].formId}
      activeStep={activeStep}
      hideSkipButton={isStepCompleted(activeStep)}
      hidePrevButton={activeStep === 0}
      totalSteps={steps.length}
    >
      {steps[activeStep].content}
    </FillingInfoWrapper>
  );
}

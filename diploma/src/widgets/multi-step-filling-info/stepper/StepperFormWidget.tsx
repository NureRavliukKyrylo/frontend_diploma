import { StepperWrapper } from "@shared/ui/wrappers";
import { StepperForm } from "@shared/ui";
import { useAuthStore } from "@entities/user";
import { steps } from "@widgets/multi-step-filling-info/filling-info";

export function StepperFormWidget() {
  const { activeStep, isStepSkipped, isStepCompleted } = useAuthStore();
  return (
    <StepperWrapper>
      <StepperForm
        steps={steps}
        activeStep={activeStep}
        isStepSkipped={isStepSkipped}
        isStepCompleted={isStepCompleted}
      />
    </StepperWrapper>
  );
}

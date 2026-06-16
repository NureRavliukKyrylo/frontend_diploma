import { StepperWrapper } from "@shared/ui/wrappers";
import { StepperForm } from "@shared/ui";
import { useAuthStore } from "@entities/user";
import { getSteps } from "@widgets/multi-step-filling-info/filling-info";
import { useTranslation } from "react-i18next";

export function StepperFormWidget() {
  const { activeStep, isStepSkipped, isStepCompleted } = useAuthStore();
  const { t } = useTranslation("auth");
  const steps = getSteps(t);
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

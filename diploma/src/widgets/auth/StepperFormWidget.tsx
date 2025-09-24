import { StepperFormLayout } from "../../shared/layouts/auth";
import { StepperForm } from "../../shared/components/stepperForm";
import { NextStepperButton } from "../../shared/buttons/auth";
import { SkipStepperButton } from "../../shared/buttons/auth";
import { PreviousStepperButton } from "../../shared/buttons/auth";

export function StepperFormWidget() {
  return (
    <StepperFormLayout>
      <StepperForm />
      <NextStepperButton />
      <PreviousStepperButton />
    </StepperFormLayout>
  );
}

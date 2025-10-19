import { StepperFormWidget } from "@widgets/auth";
import { FillingInfoForm } from "@shared/ui/layouts";
import styles from "./styles/FillingInfoFormPage.module.scss";
import { useAuthStore } from "@entities/user";
import { stepConstants } from ".";

export function FillingInfoFormPage() {
  const activeStep = useAuthStore((state) => state.activeStep);
  const isStepCompleted = useAuthStore((state) => state.isStepCompleted);

  return (
    <div className={styles.pageFillingFormWrapper}>
      <FillingInfoForm
        message={stepConstants.steps[activeStep].message}
        formDescription={stepConstants.steps[activeStep].formDescription}
        formTitle={stepConstants.steps[activeStep].formTitle}
        formId={stepConstants.steps[activeStep].formId}
        activeStep={activeStep}
        hideSkipButton={isStepCompleted(activeStep)}
        totalSteps={stepConstants.steps.length}
      >
        {stepConstants.steps[activeStep].content}
      </FillingInfoForm>
      <StepperFormWidget></StepperFormWidget>
    </div>
  );
}

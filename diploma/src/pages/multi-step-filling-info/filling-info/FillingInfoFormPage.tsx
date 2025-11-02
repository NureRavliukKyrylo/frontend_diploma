import { StepperFormWidget } from "@widgets/auth";
import { FillingInfoWrapper } from "@shared/ui/wrappers";
import styles from "./FillingInfoFormPage.module.scss";
import { useAuthStore } from "@entities/user";
import { steps } from "./configs/stepContentConfig";

export function FillingInfoFormPage() {
  const activeStep = useAuthStore((state) => state.activeStep);
  const isStepCompleted = useAuthStore((state) => state.isStepCompleted);

  return (
    <div className={styles.pageFillingFormWrapper}>
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
      <StepperFormWidget></StepperFormWidget>
    </div>
  );
}

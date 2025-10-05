import { StepperFormWidget } from "../../widgets/auth";
import { FillingInfoForm } from "../../shared/layouts/auth";
import styles from "./FillingInfoFormPage.module.scss";
import { useAuthStore } from "../../entities/user";
import { stepConstants } from "../../shared/constants";

export function FillingInfoFormPage() {
  const { activeStep } = useAuthStore();

  return (
    <div className={styles.pageFillingFormWrapper}>
      <FillingInfoForm
        message={stepConstants.steps[activeStep].message}
        formDescription={stepConstants.steps[activeStep].formDescription}
        formTitle={stepConstants.steps[activeStep].formTitle}
      >
        {stepConstants.steps[activeStep].content}
      </FillingInfoForm>
      <StepperFormWidget></StepperFormWidget>
    </div>
  );
}

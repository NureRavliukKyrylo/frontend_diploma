import { StepperFormWidget } from "@widgets/multi-step-filling-info";
import styles from "./FillingInfoFormPage.module.scss";
import { FillingFormWidget } from "@widgets/multi-step-filling-info";

export function FillingInfoFormPage() {
  return (
    <div className={styles.pageFillingFormWrapper}>
      <FillingFormWidget />
      <StepperFormWidget />
    </div>
  );
}

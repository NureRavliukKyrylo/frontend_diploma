import { StepperFormWidget } from "../../widgets/auth";
import { FillingInfoForm } from "../../shared/layouts/auth";
import styles from "./FillingInfoFormPage.module.scss";

export function FillingInfoFormPage() {
  return (
    <div className={styles.pageFillingFormWrapper}>
      <FillingInfoForm message="asdasd">
        <h1>hi</h1>
      </FillingInfoForm>
      <StepperFormWidget></StepperFormWidget>
    </div>
  );
}

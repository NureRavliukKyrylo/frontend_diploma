import { DatePicker } from "@heroui/react";
import { TextArea } from "../../../../shared/inputs";
import { I18nProvider } from "@react-aria/i18n";
import { useAboutForm } from "../model/useAboutForm";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../../shared/buttons/auth";
import styles from "./ImageForm.module.scss";

export const AboutForm = () => {
  const formik = useAboutForm();

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextArea
        id="about"
        name="about"
        value={formik.values.about}
        onChange={(e) => formik.setFieldValue("about", e.target.value)}
        onBlur={formik.handleBlur}
        error={formik.touched.about ? formik.errors.about : ""}
      />
      <I18nProvider>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DatePicker
            className="max-w-[284px]"
            label="Дата народження"
            onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
            onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
            errorMessage={
              formik.touched.dateOfBirth ? formik.errors.dateOfBirth : ""
            }
            classNames={{
              inputWrapper: "bg-[rgba(217,217,217,0.5)] rounded-[10px]",
            }}
          />
        </div>
      </I18nProvider>
      <div className={styles.buttonsFillForm}>
        <div className={styles.interactStepperButtons}>
          <PreviousStepperButton />
          <NextStepperButton />
          <SkipStepperButton />
        </div>
      </div>
    </form>
  );
};

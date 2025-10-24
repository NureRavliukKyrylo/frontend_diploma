import { TextArea } from "@shared/ui/inputs";
import { I18nProvider } from "@react-aria/i18n";
import { useAboutForm } from "../model/useAboutForm";
import styles from "./styles/AboutForm.module.scss";
import { DatePickerInput } from "@shared/ui/inputs";

export const AboutForm = () => {
  const formik = useAboutForm();

  return (
    <form
      id="about-filling-form"
      onSubmit={formik.handleSubmit}
      className={styles.aboutWrapper}
    >
      <div className={styles.inputsForm}>
        <I18nProvider>
          <div className={styles.datePickerWrapper}>
            <DatePickerInput
              name="dateOfBirth"
              label="Date of Birthday"
              value={formik.values.dateOfBirth}
              error={formik.errors.dateOfBirth}
              submit={formik.submitCount > 0}
              onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
              showMonthAndYearPickers
            />
          </div>
        </I18nProvider>
        <TextArea
          id="about"
          name="about"
          value={formik.values.about}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 ? formik.errors.about : ""}
          minHeight={250}
        />
      </div>
    </form>
  );
};

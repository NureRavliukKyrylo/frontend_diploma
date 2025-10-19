import { TextArea } from "@shared/ui/inputs";
import { I18nProvider } from "@react-aria/i18n";
import { useAboutForm } from "../model/useAboutForm";
import styles from "./AboutForm.module.scss";
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
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DatePickerInput
              name="dateOfBirth"
              label="Date of Birthday"
              value={formik.values.dateOfBirth}
              error={formik.errors.dateOfBirth}
              touched={formik.touched.dateOfBirth}
              onChange={(value) => formik.setFieldValue("dateOfBirth", value)}
              onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
              showMonthAndYearPickers
              className="w-full lg:w-[60%]"
            />
          </div>
        </I18nProvider>
        <TextArea
          id="about"
          name="about"
          value={formik.values.about ?? ""}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.about ? formik.errors.about : ""}
          minHeight={250}
        />
      </div>
    </form>
  );
};

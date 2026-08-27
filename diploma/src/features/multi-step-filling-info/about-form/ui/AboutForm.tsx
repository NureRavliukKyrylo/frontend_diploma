import { TextArea } from "@shared/ui/inputs";
import { I18nProvider } from "@react-aria/i18n";
import { useAboutForm } from "../../about-form/model/useAboutForm";
import styles from "./AboutForm.module.scss";
import { DatePickerInput } from "@shared/ui/inputs";
import { useTranslation } from "react-i18next";

export const AboutForm = () => {
  const { t } = useTranslation("auth");
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
              label={t("filling.dateOfBirth")}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.submitCount > 0 ? formik.errors.about : ""}
          minHeight={250}
          placeHolder={t("filling.bio")}
        />
      </div>
    </form>
  );
};

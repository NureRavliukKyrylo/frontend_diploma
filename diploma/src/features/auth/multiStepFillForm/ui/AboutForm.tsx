import { DatePicker } from "@heroui/react";
import { TextArea } from "../../../../shared/inputs";
import { I18nProvider } from "@react-aria/i18n";
import { useAboutForm } from "../model/useAboutForm";
import {
  NextStepperButton,
  PreviousStepperButton,
  SkipStepperButton,
} from "../../../../shared/buttons/auth";
import styles from "./AboutForm.module.scss";
import { parseDate } from "@internationalized/date";

export const AboutForm = () => {
  const formik = useAboutForm();
  const parseDateValue = () => {
    if (!formik.values.dateOfBirth) return undefined;

    try {
      return parseDate(formik.values.dateOfBirth);
    } catch (e) {
      console.error("Invalid date format:", e);
      return undefined;
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.aboutWrapper}>
      <div className={styles.inputsForm}>
        <I18nProvider>
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <DatePicker
              showMonthAndYearPickers
              isInvalid={
                formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
              }
              className="w-full lg:w-[60%]"
              label="Date of Birthday"
              value={parseDateValue()}
              onChange={(value) => {
                const dateString = value ? value.toString() : "";
                formik.setFieldValue("dateOfBirth", dateString);
              }}
              onBlur={() => formik.setFieldTouched("dateOfBirth", true)}
              errorMessage={
                formik.touched.dateOfBirth ? formik.errors.dateOfBirth : ""
              }
              classNames={{
                inputWrapper: "bg-[rgba(217,217,217,0.5)] rounded-[10px]",
                input: `${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "text-[#ff0000]"
                    : "text-gray-800"
                }`,
                selectorIcon: `${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "text-[#ff0000]"
                    : "text-gray-600"
                }`,
                errorMessage: "text-[#ff0000] ",
              }}
            />
          </div>
        </I18nProvider>
        <TextArea
          id="about"
          name="about"
          value={formik.values.about}
          onChange={(e) => formik.setFieldValue("about", e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched.about ? formik.errors.about : ""}
          minHeight={250}
        />
      </div>
      <div className={styles.buttonsFillForm}>
        <PreviousStepperButton />
        <div className={styles.interactStepperButtons}>
          <SkipStepperButton />
          <NextStepperButton />
        </div>
      </div>
    </form>
  );
};
